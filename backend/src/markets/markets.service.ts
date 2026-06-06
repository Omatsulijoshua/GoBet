import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketsService {
  constructor(private prisma: PrismaService) {}

  async getActiveMarkets() {
    return this.prisma.market.findMany({
      where: {
        status: 'OPEN',
      },
      orderBy: { endDate: 'asc' },
    });
  }

  async getMarketById(id: string) {
    const market = await this.prisma.market.findUnique({
      where: { id },
      include: {
        bets: true,
      },
    });

    if (!market) throw new NotFoundException('Market not found');
    return market;
  }

  // ADMIN ENDPOINTS
  async createMarket(data: any) {
    return this.prisma.market.create({
      data: {
        question: data.question,
        endDate: new Date(data.endDate),
        status: 'OPEN',
        yesPrice: data.yesPrice || 0.5,
        noPrice: data.noPrice || 0.5,
      }
    });
  }

  async resolveMarket(id: string, outcome: boolean) {
    const market = await this.prisma.market.update({
      where: { id },
      data: { 
        status: 'RESOLVED',
        outcome 
      }
    });
    return market;
  }
}
