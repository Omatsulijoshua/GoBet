import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BetsService {
  constructor(private prisma: PrismaService) {}

  async placeSportsBet(userId: string, amount: number, matchId: string, selectedOutcome: string) {
    // 1. Fetch match and check status
    const match = await this.prisma.match.findUnique({ where: { id: matchId } });
    if (!match) throw new BadRequestException('Match not found');
    if (match.status !== 'PENDING') throw new BadRequestException('Match is no longer open for betting');

    // 2. Determine odds based on selection
    let odds = 0;
    if (selectedOutcome === 'HOME') odds = match.oddsHome;
    else if (selectedOutcome === 'AWAY') odds = match.oddsAway;
    else if (selectedOutcome === 'DRAW' && match.oddsDraw) odds = match.oddsDraw;
    else throw new BadRequestException('Invalid outcome selected');

    // 3. Create Bet in DB
    const bet = await this.prisma.bet.create({
      data: {
        userId,
        amount,
        type: 'SPORTS',
        matchId,
        selectedOutcome,
        odds,
      }
    });

    return { success: true, bet, potentialPayout: amount * odds };
  }

  async placePredictionBet(userId: string, amount: number, marketId: string, position: boolean) {
    // 1. Fetch market
    const market = await this.prisma.market.findUnique({ where: { id: marketId } });
    if (!market) throw new BadRequestException('Market not found');
    if (market.status !== 'OPEN') throw new BadRequestException('Market is closed');

    // 2. Determine price
    const price = position ? market.yesPrice : market.noPrice;

    // 3. Create Bet
    const bet = await this.prisma.bet.create({
      data: {
        userId,
        amount,
        type: 'PREDICTION',
        marketId,
        position,
        priceAtBet: price,
      }
    });

    // 4. Update Market Volume
    await this.prisma.market.update({
      where: { id: marketId },
      data: { totalVolume: market.totalVolume + amount }
    });

    return { success: true, bet, shares: amount / price };
  }

  async getUserBets(userId: string) {
    return this.prisma.bet.findMany({
      where: { userId },
      include: {
        match: true,
        market: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
