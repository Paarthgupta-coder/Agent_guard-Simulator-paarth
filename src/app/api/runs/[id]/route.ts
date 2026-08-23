import { NextRequest, NextResponse } from "next/server";
import { getRun } from "@/lib/store";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const run = await getRun(id);
    if (!run) {
      return NextResponse.json({ error: "Run not found" }, { status: 404 });
    }
    return NextResponse.json(run);
  } catch (err) {
    console.error("Failed to fetch run:", err);
    return NextResponse.json({ error: "Failed to fetch run" }, { status: 500 });
  }
}
