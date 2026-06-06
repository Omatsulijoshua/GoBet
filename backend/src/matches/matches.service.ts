import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  async getActiveMatches() {
    return this.prisma.match.findMany({
      where: {
        status: { in: ['PENDING', 'LIVE'] },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async getMatchById(id: string) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      include: {
        bets: true,
      },
    });
    
    if (!match) throw new NotFoundException('Match not found');
    return match;
  }

  // ADMIN ENDPOINTS
  async createMatch(data: any) {
    return this.prisma.match.create({
      data: {
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,
        startTime: new Date(data.startTime),
        sport: data.sport,
        oddsHome: data.oddsHome,
        oddsAway: data.oddsAway,
        oddsDraw: data.oddsDraw || null,
        status: 'PENDING'
      }
    });
  }

  async resolveMatch(id: string, result: string) {
    const match = await this.prisma.match.update({
      where: { id },
      data: { status: 'COMPLETED' } // Simplified for MVP
    });
    return match;
  }
}
