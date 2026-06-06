import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async getActiveMatches() {
    return this.matchesService.getActiveMatches();
  }

  @Get(':id')
  async getMatch(@Param('id') id: string) {
    return this.matchesService.getMatchById(id);
  }

  @Post()
  async createMatch(@Body() data: any) {
    return this.matchesService.createMatch(data);
  }

  @Patch(':id/resolve')
  async resolveMatch(@Param('id') id: string, @Body('result') result: string) {
    return this.matchesService.resolveMatch(id, result);
  }
}
