import { NextRequest, NextResponse } from 'next/server';
import { loadDJs } from '@/lib/data-access';
import { matchDJs } from '@/lib/matching-algorithm';
import { EventRequest } from '@/types/event';

export async function POST(request: NextRequest) {
  try {
    const body: EventRequest = await request.json();

    if (!body.location || !body.budgetMin || !body.budgetMax || !body.duration) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const allDJs = await loadDJs();
    const matches = matchDJs(allDJs, body);

    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error matching DJs:', error);
    return NextResponse.json({ error: 'Failed to match DJs' }, { status: 500 });
  }
}
