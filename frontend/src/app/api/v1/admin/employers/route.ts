import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EmployerLead } from '@/models/EmployerLead';

export async function GET() {
  try {
    await connectDB();
    const employers = await EmployerLead.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: {
        employers,
        pagination: {
          total: employers.length,
          page: 1,
          limit: employers.length,
          totalPages: 1,
        },
      },
    });
  } catch (error: any) {
    console.error('Error fetching employers:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: error?.message } },
      { status: 500 }
    );
  }
}
