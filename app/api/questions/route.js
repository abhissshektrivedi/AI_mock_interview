import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { topic } = await req.json();
    console.log("API /api/questions called with topic:", topic);

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Generate 5 interview questions for the topic: ${topic}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const geminiData = await geminiRes.json();
    console.log("Gemini response:", JSON.stringify(geminiData, null, 2));

    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const questions = text
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
