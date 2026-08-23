import { NextResponse } from "next/server";
import { createRun, listRuns } from "@/lib/store";
import { runDemoPipeline } from "@/lib/simulate";
import { buildRunSet } from "@/lib/scenario";
import { appendLog, updateRun } from "@/lib/store";

export async function POST() {
  try {
    const id = `RUN_${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const total = buildRunSet().length;
    await createRun(id, total);

    // Fire and forget — the client polls GET /api/runs/[id] for progress.
    // Failures inside the pipeline are written back onto the run itself
    // rather than thrown into the void, so the UI can surface them.
    runDemoPipeline(id).catch(async (err) => {
      console.error(`Run ${id} failed:`, err);
      await appendLog(id, `Pipeline error: ${err instanceof Error ? err.message : "unknown error"}`, "error");
      await updateRun(id, { status: "done" });
    });

    return NextResponse.json({ id });
  } catch (err) {
    console.error("Failed to start run:", err);
    return NextResponse.json({ error: "Failed to start run" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const runs = await listRuns();
    return NextResponse.json({ runs });
  } catch (err) {
    console.error("Failed to list runs:", err);
    return NextResponse.json({ error: "Failed to list runs" }, { status: 500 });
  }
}
