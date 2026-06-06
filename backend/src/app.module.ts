import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BetsModule } from './bets/bets.module';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { MarketsModule } from './markets/markets.module';

@Module({
  imports: [PrismaModule, BetsModule, UsersModule, MatchesModule, MarketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
