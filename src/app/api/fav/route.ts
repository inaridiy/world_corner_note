import { createOpenAIClient } from "@/lib/openai";
import { toSnakeCase } from "@/lib/snake";
import { createSupabaseClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();
  const openai = createOpenAIClient();

  const body = await request.json();
  if (!body) return new NextResponse("Missing body", { status: 400 });
  if (!body.memoId || typeof body.memoId !== "string")
    return new NextResponse("Invalid body", { status: 400 });

  const response = await supabase.rpc(
    "favorite",
    toSnakeCase({ memoId: body.memoId })
  );

  if (response.error)
    return new NextResponse(response.error.message, { status: 500 });

  return NextResponse.json({ message: "success" });
}
