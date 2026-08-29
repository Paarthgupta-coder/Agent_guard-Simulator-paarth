import { applyPatch, patchForCategory } from "./agent";
import { callAgent } from "./llm";
import { buildRunSet } from "./scenario";
import { buildPersonaResult, computeScores, findRootCause } from "./evaluate";
import { appendLog, updateRun, getCurrentPrompt, setCurrentPrompt } from "./store";
import { PersonaResult, Persona } from "./types";

/**
 * Runs the full "1,000 Angry Users vs Your AI Agent" pipeline for one run id.
 * Uses a concurrency pool to batch execution (Module 01 + 04 enhancement).
 */
export async function runDemoPipeline(runId: string) {
  const personas = buildRunSet();
  const currentPrompt = await getCurrentPrompt();
  
  await updateRun(runId, { status: "chaos_input" });
  await appendLog(runId, `Injecting ${personas.length} synthetic users using a concurrency pool...`, "info");

  // --- Module 01 + 04: Simulation Engine + Multi-Run Execution (Chunked Concurrency) ---
  const results: PersonaResult[] = [];
  const CHUNK_SIZE = 6;
  
  for (let i = 0; i < personas.length; i += CHUNK_SIZE) {
    const chunk = personas.slice(i, i + CHUNK_SIZE);
    
    await Promise.all(chunk.map(async (persona) => {
      const { text, tokensUsed, mocked } = await callAgent(currentPrompt, persona);
      const result = buildPersonaResult(persona, text, tokensUsed, mocked);
      results.push(result);
      
      await appendLog(
        runId,
        `${persona.name} (${persona.mood}) → ${result.passed ? "OK" : `FLAGGED: ${result.flags.map(f => typeof f === 'string' ? f : f.category).join(", ")}`}`,
        result.passed ? "info" : "warn"
      );
    }));
    
    await updateRun(runId, { results: [...results] });
    await sleep(200); // pacing between chunks for the live feed
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

    const toRerun = results.filter((r) => !r.passed);
    // Flatten flags, handling both old string format and new object format (if implemented next)
    const categoriesToPatch = [...new Set(toRerun.flatMap((r) => r.flags.map(f => typeof f === 'string' ? f : f.category)))];
    
    let patchedPrompt = currentPrompt;
    const reasons: string[] = [];
    
    for (const cat of categoriesToPatch) {
      const patch = patchForCategory(cat as any);
      patchedPrompt = applyPatch(patchedPrompt, patch);
      reasons.push(patch.reason);
    }
    
    await updateRun(runId, { patchApplied: reasons.join(" ") });
    await appendLog(runId, `Auto-patch applied across ${categoriesToPatch.length} failure categories.`, "info");
    
    // Save the patched prompt so the NEXT run gets smarter (Module 06 fix)
    await setCurrentPrompt(patchedPrompt);
    await appendLog(runId, "Prompt baseline permanently hardened for future runs.", "success");

    const rerunResults: PersonaResult[] = [];
    
    for (let i = 0; i < toRerun.length; i += CHUNK_SIZE) {
      const chunk = toRerun.slice(i, i + CHUNK_SIZE);
      
      await Promise.all(chunk.map(async (failed) => {
        const { text, tokensUsed, mocked } = await callAgent(patchedPrompt, failed.persona);
        const result = buildPersonaResult(failed.persona, text, tokensUsed, mocked);
        rerunResults.push(result);
        
        await appendLog(
          runId,
          `Re-run ${failed.persona.name} → ${result.passed ? "FIXED" : "still failing"}`,
          result.passed ? "success" : "error"
        );
      }));
      
      await updateRun(runId, { rerunResults: [...rerunResults] });
      await sleep(200);
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
