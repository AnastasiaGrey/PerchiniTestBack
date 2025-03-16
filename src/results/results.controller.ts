import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/createResult';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}
  @Post('create')
  async createResult(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.createResult(createResultDto);
  }
  @Get(':employee_id')
  async getResults(@Param('employee_id') employee_id: string) {
    return this.resultsService.getResults(employee_id);
  }
}
