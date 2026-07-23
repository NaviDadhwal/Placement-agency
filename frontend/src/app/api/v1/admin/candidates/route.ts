import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { CandidateLead } from '@/models/CandidateLead';

export async function GET() {
  try {
    await connectDB();
    const candidates = await CandidateLead.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        candidates,
        pagination: {
          total: candidates.length,
          page: 1,
          limit: candidates.length,
          totalPages: 1,
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error?.message } },
      { status: 500 }
    );
  }
}
