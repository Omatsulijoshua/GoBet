import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { BetsService } from './bets.service';

@Controller('bets')
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Post('place')
  async placeBet(
    @Body('userId') userId: string,
    @Body('amount') amount: number,
    @Body('matchId') matchId?: string,
    @Body('marketId') marketId?: string,
    @Body('selectedOutcome') selectedOutcome?: string,
    @Body('position') position?: boolean
  ) {
    if (matchId && selectedOutcome) {
      return this.betsService.placeSportsBet(userId, amount, matchId, selectedOutcome);
    } else if (marketId && position !== undefined) {
      return this.betsService.placePredictionBet(userId, amount, marketId, position);
    } else {
      throw new BadRequestException('Invalid bet parameters');
    }
  }

  @Get('user/:userId')
  async getUserBets(@Param('userId') userId: string) {
    return this.betsService.getUserBets(userId);
  }
}
