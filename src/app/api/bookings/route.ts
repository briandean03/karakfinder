import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const djId = request.nextUrl.searchParams.get('djId');

    const bookings = await prisma.booking.findMany({
      where: djId ? { djId } : undefined,
      include: { dj: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { djId, clientName, clientPhone, eventType, location, date, duration, budget, notes } = body;

    if (!djId || !clientName || !clientPhone || !eventType || !location || !date || !duration || !budget) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const djExists = await prisma.dJ.findUnique({ where: { id: djId } });
    if (!djExists) {
      return NextResponse.json({ error: 'DJ not found' }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        djId,
        clientName,
        clientPhone,
        eventType,
        location,
        date: new Date(date),
        duration,
        budget,
        notes: notes ?? null,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
