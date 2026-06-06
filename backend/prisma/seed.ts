import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create mock users
  const user1 = await prisma.user.upsert({
    where: { walletAddress: '0x1234567890abcdef1234567890abcdef12345678' },
    update: {},
    create: {
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      role: 'USER',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12' },
    update: {},
    create: {
      walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      role: 'ADMIN',
    },
  });

  // Create mock matches
  const match1 = await prisma.match.create({
    data: {
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      sport: 'Soccer',
      status: 'PENDING',
      oddsHome: 1.8,
      oddsAway: 2.1,
      oddsDraw: 3.5,
    },
  });

  const match2 = await prisma.match.create({
    data: {
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      startTime: new Date(Date.now() + 172800000), // 2 days from now
      sport: 'Basketball',
      status: 'PENDING',
      oddsHome: 1.5,
      oddsAway: 2.5,
    },
  });

  // Create mock markets
  const market1 = await prisma.market.create({
    data: {
      question: 'Will Bitcoin reach $100k by end of 2026?',
      endDate: new Date('2026-12-31T23:59:59Z'),
      status: 'OPEN',
      yesPrice: 0.65,
      noPrice: 0.35,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
