export async function POST(request) {
    const interviewId = crypto.randomUUID();
    const mockId = crypto.randomUUID(); // generate a mockId too
  
    // (Optional) Save to DB or state here if needed
  
    return new Response(
      JSON.stringify({ interviewId, mockId }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  