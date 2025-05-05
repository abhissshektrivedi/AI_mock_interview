import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mockId = searchParams.get('mockId');

  console.log('>>> Received GET with mockId:', mockId);

  if (!mockId) {
    return NextResponse.json({ error: 'mockId is required' }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT jsonMockResp
      FROM mockinterviews
      WHERE mockId = ${mockId}
    `;

    if (!result.rows.length) {
      return NextResponse.json({ questions: [] });
    }

    const parsed = JSON.parse(result.rows[0].jsonmockresp);
    return NextResponse.json({ questions: parsed });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching mock response' }, { status: 500 });
  }
}
