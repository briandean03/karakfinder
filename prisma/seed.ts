import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import djsData from '../src/data/djs.json';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding DJs...');

  for (const dj of djsData) {
    await prisma.dJ.upsert({
      where: { id: dj.id },
      update: {},
      create: {
        id: dj.id,
        name: dj.name,
        location: dj.location,
        genres: dj.genres,
        vibeTags: dj.vibeTags,
        level: dj.level as 'NEW' | 'READY' | 'VERIFIED' | 'ELITE',
        pricePerHour: dj.pricePerHour,
        bio: dj.bio,
        mixUrls: dj.mixUrls,
        crowdClipUrls: dj.crowdClipUrls,
        mixScore: dj.mixScore,
        crowdScore: dj.crowdScore,
        reliabilityScore: dj.reliabilityScore,
        whatsappNumber: dj.whatsappNumber,
      },
    });
  }

  console.log(`Seeded ${djsData.length} DJs.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
