import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { MarketsService } from './markets.service';

@Controller('markets')
export class MarketsController {
  constructor(private readonly marketsService: MarketsService) {}

  @Get()
  async getActiveMarkets() {
    return this.marketsService.getActiveMarkets();
  }

  @Get(':id')
  async getMarket(@Param('id') id: string) {
    return this.marketsService.getMarketById(id);
  }

  @Post()
  async createMarket(@Body() data: any) {
    return this.marketsService.createMarket(data);
  }

  @Patch(':id/resolve')
  async resolveMarket(@Param('id') id: string, @Body('outcome') outcome: boolean) {
    return this.marketsService.resolveMarket(id, outcome);
  }
}
