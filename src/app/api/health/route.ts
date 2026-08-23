import { NextResponse } from "next/server";
import { storeMode } from "@/lib/store";

export async function GET() {
  const mode = await storeMode();
  return NextResponse.json({
    status: "ok",
    storage: mode,
    agentMode: process.env.OPENAI_API_KEY ? "live-model" : "mock-agent",
    time: new Date().toISOString(),
  });
}
