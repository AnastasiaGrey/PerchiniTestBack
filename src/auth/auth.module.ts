import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, AppService],
})
export class AuthModule {}
