import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EmployerLead } from '@/models/EmployerLead';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { companyName, contactPerson, email, phone, hiringRole, requirements, consentGiven } = body;

    if (!companyName || !contactPerson || !email || !phone || !hiringRole) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'CompanyName, ContactPerson, Email, Phone, and HiringRole are required fields.',
          },
        },
        { status: 400 }
      );
    }

    const employerLead = await EmployerLead.create({
      companyName,
      contactPerson,
      email,
      phone,
      hiringRole,
      requirements: requirements || '',
      consentGiven: consentGiven !== false,
      status: 'NEW',
    });

    console.log('Saved employer lead to MongoDB Atlas:', employerLead._id);

    return NextResponse.json(
      {
        success: true,
        data: {
          id: employerLead._id,
          companyName: employerLead.companyName,
          status: employerLead.status,
          createdAt: employerLead.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error submitting employer lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to submit employer lead.',
        },
      },
      { status: 500 }
    );
  }
}
