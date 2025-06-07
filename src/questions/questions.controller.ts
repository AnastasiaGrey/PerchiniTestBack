import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}
  @Post('create')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestions(createQuestionDto);
  }
  @Get(':test_id')
  get(@Param('test_id') test_id:string){
    return this.questionsService.getQuestions(test_id);
  }
  @Get(':managerId')
  async getList(@Param() managerId:string){
    return await this.questionsService.getListQuetionsCreatedByManager(managerId)
  }
  @Get('status/:test_id')
  async getTestWithStatuses(@Param('test_id') test_id:string){
    return await this.questionsService.getTestById(test_id)
  }
  @Patch('update')
  async updateTest(@Body() data:UpdateQuestionDto){
    return await this.questionsService.updateQuestion(data)
  }
  @Get('list/all')
  async getTests(){
    return await this.questionsService.getListAll()
  }
 }
