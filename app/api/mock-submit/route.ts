// app/api/mock-submit/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.text(); // Since you're sending x-www-form-urlencoded
  console.log('Mock form body:', body);

  return NextResponse.json({ message: 'Success' }, { status: 200 });
}

export function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
