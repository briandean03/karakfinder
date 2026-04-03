import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loadDJs, getDJById } from '@/lib/data-access';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const location = searchParams.get('location');
    const genre = searchParams.get('genre');
    const level = searchParams.get('level');

    if (id) {
      const dj = await getDJById(id);
      if (!dj) {
        return NextResponse.json({ error: 'DJ not found' }, { status: 404 });
      }
      return NextResponse.json(dj);
    }

    let djs = await loadDJs();

    if (location) {
      djs = djs.filter((dj) => dj.location === location);
    }
    if (genre) {
      djs = djs.filter((dj) =>
        dj.genres.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    if (level) {
      djs = djs.filter((dj) => dj.level === level.toUpperCase());
    }

    return NextResponse.json(djs);
  } catch (error) {
    console.error('Error fetching DJs:', error);
    return NextResponse.json({ error: 'Failed to fetch DJs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, location, genres, vibeTags, level, pricePerHour, bio,
            mixUrls, crowdClipUrls, mixScore, crowdScore, reliabilityScore, whatsappNumber } = body;

    if (!id || !name || !location || !genres || !level || !pricePerHour) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const dj = await prisma.dJ.create({
      data: {
        id, name, location, genres, vibeTags: vibeTags ?? [],
        level, pricePerHour, bio: bio ?? '',
        mixUrls: mixUrls ?? [], crowdClipUrls: crowdClipUrls ?? [],
        mixScore: mixScore ?? 0, crowdScore: crowdScore ?? 0,
        reliabilityScore: reliabilityScore ?? 0,
        whatsappNumber: whatsappNumber ?? '',
      },
    });

    return NextResponse.json(dj, { status: 201 });
  } catch (error) {
    console.error('Error creating DJ:', error);
    return NextResponse.json({ error: 'Failed to create DJ' }, { status: 500 });
  }
}
