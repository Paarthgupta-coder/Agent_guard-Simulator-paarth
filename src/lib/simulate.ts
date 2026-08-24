import { AGENT_SYSTEM_PROMPT_V1, applyPatch, patchForCategory } from "./agent";
import { callAgent } from "./llm";
import { buildRunSet } from "./scenario";
import { buildPersonaResult, computeScores, findRootCause } from "./evaluate";
import { appendLog, updateRun } from "./store";
import { PersonaResult } from "./types";

/**
 * Runs the full "1,000 Angry Users vs Your AI Agent" pipeline for one run id.
 * Deliberately awaited step by step (not all-parallel) so the live console /
 * run grid has a believable, watchable progression during a demo.
 */
export async function runDemoPipeline(runId: string) {
  const personas = buildRunSet();
  await updateRun(runId, { status: "chaos_input" });
  await appendLog(runId, `Injecting ${personas.length} synthetic users (control, adversarial, canary repeats)...`, "info");

  // --- Module 01 + 04: Simulation Engine + Multi-Run Execution ---
  const results: PersonaResult[] = [];
  for (const persona of personas) {
    const { text, tokensUsed, mocked } = await callAgent(AGENT_SYSTEM_PROMPT_V1, persona);
    const result = buildPersonaResult(persona, text, tokensUsed, mocked);
    results.push(result);
    await updateRun(runId, { results: [...results] });
    await appendLog(
      runId,
      `${persona.name} (${persona.mood}) → ${result.passed ? "OK" : `FLAGGED: ${result.flags.join(", ")}`}`,
      result.passed ? "info" : "warn"
    );
    await sleep(70); // pacing for the live feed
  }

  // --- Module 05: Evaluation Engine ---
  await updateRun(runId, { status: "failure_detection" });
  const scoresBefore = computeScores(results);
  await updateRun(runId, { scoresBefore });
  const failedCount = results.filter((r) => !r.passed).length;
  await appendLog(runId, `Failure detection complete: ${failedCount} of ${personas.length} runs flagged.`, failedCount ? "error" : "success");

  // --- Root cause clustering ---
  await updateRun(runId, { status: "root_cause" });
  const rootCause = findRootCause(results);
  if (rootCause) {
    await updateRun(runId, { rootCause });
    await appendLog(runId, rootCause.summary, "warn");
  } else {
    await appendLog(runId, "No failures found — agent passed the full adversarial suite.", "success");
  }

  // --- Module 06: Learning Loop ---
  if (rootCause) {
    await updateRun(runId, { status: "auto_improve" });

    // Patch every distinct failure category seen this run, not just the
    // majority one — the learning loop hardens the whole prompt in one pass.
    const toRerun = results.filter((r) => !r.passed);
    const categoriesToPatch = [...new Set(toRerun.flatMap((r) => r.flags))];
    let patchedPrompt = AGENT_SYSTEM_PROMPT_V1;
    const reasons: string[] = [];
    for (const cat of categoriesToPatch) {
      const patch = patchForCategory(cat);
      patchedPrompt = applyPatch(patchedPrompt, patch);
      reasons.push(patch.reason);
    }
    await updateRun(runId, { patchApplied: reasons.join(" ") });
    await appendLog(runId, `Auto-patch applied across ${categoriesToPatch.length} failure categories.`, "info");
    const rerunResults: PersonaResult[] = [];
    for (const failed of toRerun) {
      const { text, tokensUsed, mocked } = await callAgent(patchedPrompt, failed.persona);
      const result = buildPersonaResult(failed.persona, text, tokensUsed, mocked);
      rerunResults.push(result);
      await updateRun(runId, { rerunResults: [...rerunResults] });
      await appendLog(
        runId,
        `Re-run ${failed.persona.name} → ${result.passed ? "FIXED" : "still failing"}`,
        result.passed ? "success" : "error"
      );
      await sleep(70);
    }

    const mergedResults = results.map((r) => {
      const rerun = rerunResults.find((rr) => rr.persona.id === r.persona.id);
      return rerun ?? r;
    });
    const scoresAfter = computeScores(mergedResults);
    await updateRun(runId, { scoresAfter });
    await appendLog(
      runId,
      `Reliability ${scoresBefore.reliability} → ${scoresAfter.reliability}, Safety ${scoresBefore.safety} → ${scoresAfter.safety}.`,
      "success"
    );
  } else {
    await updateRun(runId, { scoresAfter: scoresBefore });
  }

  await updateRun(runId, { status: "done" });
  await appendLog(runId, "Run complete.", "success");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
