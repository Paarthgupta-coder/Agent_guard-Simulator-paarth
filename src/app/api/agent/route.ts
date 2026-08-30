import { NextResponse } from "next/server";
import { getAgentState } from "@/lib/agentState";

export async function GET() {
  try {
    const state = await getAgentState();
    return NextResponse.json(state);
  } catch (err) {
    console.error("Failed to fetch agent state:", err);
    return NextResponse.json({ error: "Failed to fetch agent state" }, { status: 500 });
  }
}
