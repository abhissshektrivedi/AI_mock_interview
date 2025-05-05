export async function GET(request, { params }) {
    const { interviewId, mockId } = params;
  
    const mockData = {
      jsonMockResp: [
        { Question: 'Tell me about yourself.', Answer: 'I am a software engineer with 3 years of experience.' },
        { Question: 'What is React?', Answer: 'React is a JavaScript library for building user interfaces.' },
      ],
    };
  
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  