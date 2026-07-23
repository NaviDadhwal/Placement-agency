import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { CandidateLead } from '@/models/CandidateLead';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { fullName, phone, preferredLocation, industry, resumeUrl, consentGiven } = body;

    if (!fullName || !phone || !preferredLocation || !industry) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'FullName, Phone, PreferredLocation, and Industry are required fields.',
          },
        },
        { status: 400 }
      );
    }

    const candidateLead = await CandidateLead.create({
      fullName,
      phone,
      preferredLocation,
      industry,
      resumeUrl: resumeUrl || 'https://makemyaim.com/uploads/resumes/default_resume.pdf',
      consentGiven: consentGiven !== false,
      status: 'NEW',
    });

    console.log('Saved candidate lead to MongoDB Atlas:', candidateLead._id);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: candidateLead._id,
          fullName: candidateLead.fullName,
          status: candidateLead.status,
          createdAt: candidateLead.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting candidate lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to submit candidate lead.',
        },
      },
      { status: 500 }
    );
  }
}
