import { createOpenAIClient } from "@/lib/openai";
import { toSnakeCase } from "@/lib/snake";
import { createSupabaseClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { uuidv7 } from "uuidv7";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const supabase = createSupabaseClient();
  const openai = createOpenAIClient();

  const body = await request.json();
  if (!body) return new NextResponse("Missing body", { status: 400 });
  if (!body.memo || typeof body.memo !== "string")
    return new NextResponse("Invalid body", { status: 400 });

  const embeddings = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: body.memo,
  });

  const response = await supabase.from("memo").insert(
    toSnakeCase({
      id: uuidv7(),
      memo: body.memo,
      favorite: 0,
      embedding: JSON.stringify(embeddings.data[0].embedding),
      createdAt: new Date().toISOString(),
    })
  );

  if (response.error)
    return new NextResponse(response.error.message, { status: 500 });

  return NextResponse.json({ message: "success" });
}
