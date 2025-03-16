import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TestsModule } from './tests/tests.module';
import { QuestionsModule } from './questions/questions.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [AuthModule, TestsModule, QuestionsModule, ResultsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}