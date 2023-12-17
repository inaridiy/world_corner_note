import { createOpenAIClient } from "@/lib/openai";
import { toCamelCase, toSnakeCase } from "@/lib/snake";
import { createSupabaseClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  context: { params: { query: string } }
) {
  const supabase = createSupabaseClient();
  const openai = createOpenAIClient();

  const { query } = context.params;
  if (!query) return new NextResponse("Missing query", { status: 400 });
  if (typeof query !== "string")
    return new NextResponse("Invalid query", { status: 400 });
  if (query === "teapot")
    return new NextResponse("I'm a teapot", { status: 418 });

  const embeddings = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
  });

  const response = await supabase.rpc(
    "search_memo",
    toSnakeCase({
      queryEmbedding: JSON.stringify(embeddings.data[0].embedding),
      matchThreshold: 0.78,
      maxLimit: 10,
    })
  );

  if (response.error)
    return new NextResponse(response.error.message, { status: 500 });

  const results = response.data.map(toCamelCase);

  return NextResponse.json(results);
}
