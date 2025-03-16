import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TestsService {
    constructor(private prisma: PrismaService) {}
    async getList(){
        return await this.prisma.test.findMany()
    }
}
    