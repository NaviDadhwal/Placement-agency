import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { CandidateLead } from '@/models/CandidateLead';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const { status, isSolved, placementNotes } = body;

    const lead = await CandidateLead.findById(id);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Candidate lead not found.' } },
        { status: 404 }
      );
    }

    if (status) lead.status = status;
    if (typeof isSolved === 'boolean') {
      lead.isSolved = isSolved;
      lead.solvedAt = isSolved ? new Date() : undefined;
    }
    if (placementNotes !== undefined) lead.placementNotes = placementNotes;

    await lead.save();

    return NextResponse.json({
      success: true,
      data: lead,
    });
  } catch (error: any) {
    console.error('Error updating candidate status:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error?.message } },
      { status: 500 }
    );
  }
}
