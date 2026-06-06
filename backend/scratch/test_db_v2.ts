
import { PrismaClient } from '@prisma/client';

async function test(url) {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url,
      },
    },
  });

  try {
    await prisma.$connect();
    console.log(`SUCCESS with URL: ${url}`);
    await prisma.$disconnect();
    return true;
  } catch (err) {
    console.log(`FAILED with URL: ${url} - ${err.message}`);
    return false;
  }
}

async function main() {
  const passwords = ['sirbill', 'sirbills', 'SirBill', 'SirBills', 'gobet', 'GoBet'];
  for (const pw of passwords) {
    const url = `postgresql://postgres:${pw}@localhost:5432/postgres?schema=public`;
    if (await test(url)) {
      process.exit(0);
    }
  }
  process.exit(1);
}

main();
