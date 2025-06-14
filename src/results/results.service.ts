import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateResultDto } from './dto/createResult';

@Injectable()
export class ResultsService {
    constructor(private readonly prisma: PrismaService) {}
    async createResult(createResultDto: CreateResultDto){
        const test = await this.prisma.test.findUnique({
            where: {
                id: createResultDto.test_id
            },
            include: {
                question: {
                    include: {
                        variants: true
                    }
                }
            }
        })
        let score = 0;
        if(!test) throw new NotFoundException('Тест не найден!')
        for(const question of createResultDto.answers){
           const questionFound = test.question.find((q) => q.id === question.question_id)
           if (!questionFound) throw new NotFoundException('Вопрос не найден!')
           const variantFound = questionFound.variants.find((v) => v.id === question.answer_id)
           if (!variantFound) throw new NotFoundException('Вариант ответа не найден!')
           if(variantFound.status === 'correct'){
                score++
           }
        }
        const result = await this.prisma.results.create({
            data: {
                points_scored: score,
                start_time: createResultDto.start_time,
                end_time: createResultDto.end_time,
                employee_id: createResultDto.employee_id,
                test_id: createResultDto.test_id
            }
        })
        return result
    }
    async getResults(employee_id: string) {
        console.log(employee_id)
        const results = await this.prisma.results.findMany({
            where: {
                employee:{
                    userId:employee_id
                }
            },
            include:{
                test:{
                    select:{
                        name:true
                    }
                }
            }
        })
        console.log(results)
        return results
    }
    async getWaitersList(){
        const res =  await this.prisma.user.findMany({
            where:{
                employee: {
                    isNot: null
                }
            },
            select:{
                id:true,
                name:true,
                employee:true
            }
        })
        console.log(res)
        return res
    }
    async getWaiterRes(employee_id:string, test_id:string){
        return await this.prisma.results.findMany({
            where:{
                test_id:test_id,
                employee_id,
            },
            include:{
                test:{
                select:{
                    name:true
                }
                }
            }
        })
    }
}
