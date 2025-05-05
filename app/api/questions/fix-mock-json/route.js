import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";

export async function GET() {
  try {
    const interviews = await db.select().from(MockInterview);

    // ✅ Return actual data
    return Response.json({ questions: interviews });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}

