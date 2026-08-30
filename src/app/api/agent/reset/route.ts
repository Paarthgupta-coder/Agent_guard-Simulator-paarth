import { NextResponse } from "next/server";
import { resetAgentState } from "@/lib/agentState";

export async function POST() {
  try {
    const state = await resetAgentState();
    return NextResponse.json(state);
  } catch (err) {
    console.error("Failed to reset agent state:", err);
    return NextResponse.json({ error: "Failed to reset agent state" }, { status: 500 });
  }
}
