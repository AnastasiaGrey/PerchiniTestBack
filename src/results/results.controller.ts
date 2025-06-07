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
  @Get('waiter/:employee_id')
  async getResults(@Param('employee_id') employee_id: string) {
    return this.resultsService.getResults(employee_id);
  }
  @Get('waiter/list')
  async getManagersList(){
    console.log('in ythis')
    return await this.resultsService.getWaitersList()
  }
  @Get('list/waiter')
  async getListManagers(){
    return await this.resultsService.getWaitersList()
  }
  @Get(':employee_id/:test_id')
  async getResult(@Param('employee_id') employee_id:string, @Param('test_id') test_id:string){
    return await this.resultsService.getWaiterRes(employee_id, test_id)
  }
}
