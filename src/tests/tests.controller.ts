import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTest } from './tests.type';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}
  @Get('list/:managerId')
  getList(@Param('managerId') managerId:string){
    return this.testsService.getList(managerId)
  }
  @Get('list')
  async getAllList(){
    return await this.testsService.getListAll()
  }
  @Get('list/finished/:waiter_id')
  async getListFinifhed(@Param('waiter_id') waiter_id:string){
    return await this.testsService.getListFinished(waiter_id)
  }
  @Get('list/not-start/:waiter_id')
  async getListNotStarted(@Param('waiter_id') waiter_id:string){
    return await this.testsService.getListNotStarted(waiter_id)
  }
  @Get('list/all')
  async getAll(){
    return await this.testsService.getAllList()
  }
  // @Post('create')
  // createTest(@Body() body:CreateTest){
  //   return this.testsService.CreateTest(body)
  // }

  // @Get('gettest')
  // getTest(@Body() body:CreateTest){
  //   return this.testsService.Test(body)
  // }
}
