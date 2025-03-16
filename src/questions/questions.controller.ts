import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

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
 }
