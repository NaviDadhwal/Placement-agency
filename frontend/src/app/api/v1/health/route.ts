import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      status: 'online',
      timestamp: new Date().toISOString(),
      service: 'Make My Aim Placement Agency API (Next.js Serverless)',
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'degraded', error: error?.message },
      { status: 500 }
    );
  }
}
