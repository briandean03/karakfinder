import { prisma } from '@/lib/prisma';
import { DJ } from '@/types/dj';
import { Prisma } from '@prisma/client';

function toDJ(record: Prisma.DJGetPayload<{}>): DJ {
  return {
    id: record.id,
    name: record.name,
    location: record.location,
    genres: record.genres as DJ['genres'],
    vibeTags: record.vibeTags as DJ['vibeTags'],
    level: record.level as DJ['level'],
    pricePerHour: record.pricePerHour,
    bio: record.bio,
    mixUrls: record.mixUrls,
    crowdClipUrls: record.crowdClipUrls,
    mixScore: record.mixScore,
    crowdScore: record.crowdScore,
    reliabilityScore: record.reliabilityScore,
    whatsappNumber: record.whatsappNumber,
  };
}

export async function loadDJs(): Promise<DJ[]> {
  const records = await prisma.dJ.findMany({ orderBy: { createdAt: 'asc' } });
  return records.map(toDJ);
}

export async function getDJById(id: string): Promise<DJ | null> {
  const record = await prisma.dJ.findUnique({ where: { id } });
  return record ? toDJ(record) : null;
}
