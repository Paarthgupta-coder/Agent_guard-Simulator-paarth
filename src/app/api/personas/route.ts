import { NextResponse } from "next/server";
import { addPersona } from "@/lib/scenario";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, mood, category, message } = body;
    
    if (!name || !mood || !category || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    addPersona({ name, mood, category, message });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
