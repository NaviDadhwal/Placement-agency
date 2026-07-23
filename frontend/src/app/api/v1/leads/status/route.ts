import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { CandidateLead } from '@/models/CandidateLead';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Phone number is required.' } },
        { status: 400 }
      );
    }

    const lead = await CandidateLead.findOne({ phone: phone.trim() }).sort({ createdAt: -1 });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'No application found registered with this phone number.',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: lead._id,
        fullName: lead.fullName,
        phone: lead.phone,
        preferredLocation: lead.preferredLocation,
        industry: lead.industry,
        status: lead.status,
        isSolved: lead.isSolved,
        createdAt: lead.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Error checking status:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error?.message } },
      { status: 500 }
    );
  }
}
