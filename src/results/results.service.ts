import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateResultDto } from './dto/createResult';

@Injectable()
export class ResultsService {
    constructor(private readonly prisma: PrismaService) {}
    async createResult(createResultDto: CreateResultDto){
        const test = await this.prisma.test.findUnique({
            where: {
                id: createResultDto.test_id
            }
        })
        for(const question of createResultDto.answers){
            
    }
}
