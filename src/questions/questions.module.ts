import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, PrismaService, AppService],
})
export class QuestionsModule {}
