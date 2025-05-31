import { NextRequest, NextResponse } from 'next/server';
import { getUserVisits, createVisit } from '../../../lib/visit';
import { insertVisitSchema } from '../../../shared/schema';

export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const visits = await getUserVisits(parseInt(userId));
    return NextResponse.json(visits);
  } catch (error) {
    console.error('Get visits error:', error);
    return NextResponse.json(
      { error: 'Failed to get visits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.cookies.get('userId')?.value;

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate the request body
    const validatedData = insertVisitSchema.parse(body);
    
    // Transform data to match CreateVisitRequest interface
    const visitData = {
      countryCode: validatedData.countryCode,
      countryName: validatedData.countryName,
      state: validatedData.state || undefined,
      city: validatedData.city || undefined,
      visitMonth: validatedData.visitMonth,
      visitYear: validatedData.visitYear,
      notes: validatedData.notes || undefined,
    };
    
    const visit = await createVisit(parseInt(userId), visitData);
    return NextResponse.json(visit, { status: 201 });
  } catch (error) {
    console.error('Create visit error:', error);
    return NextResponse.json(
      { error: 'Failed to create visit' },
      { status: 500 }
    );
  }
}