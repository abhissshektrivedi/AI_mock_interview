import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";

export async function GET(req, { params }) {
  const { mockId } = params;

  try {
    const interview = await db
      .select()
      .from(MockInterview)
      .where(MockInterview.mockId.eq(mockId))
      .limit(1);

    if (!interview || interview.length === 0) {
      return new Response(JSON.stringify({ questions: [] }), { status: 404 });
    }

    const rawJson = interview[0].jsonMockResp;

    let parsedQuestions = [];
    try {
      parsedQuestions = typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;
    } catch (err) {
      console.error("Failed to parse questions JSON:", err);
    }

    return new Response(JSON.stringify({ questions: parsedQuestions }), {
      status: 200,
    });
  } catch (err) {
    console.error("DB fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch questions" }), {
      status: 500,
    });
  }
}
