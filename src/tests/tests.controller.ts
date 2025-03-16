import { Body, Controller, Post, Get } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTest } from './tests.type';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}
  @Get('list')
  getList(){
    return this.testsService.getList()
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
