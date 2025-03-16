import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class QuestionsService {
  constructor(private  readonly prisma: PrismaService){}
  async createQuestions(createQuestionDto: CreateQuestionDto){
    try {
      const test = await this.prisma.test.create({
        data:{
          name:createQuestionDto.test_name,
          manager_id:createQuestionDto.manager_id
        }
      })
      for(const question of createQuestionDto.questions){
        const questionCreated = await this.prisma.question.create({
          data:{
            test_id: test.id,
            question: question.question
          }
        })
        for(const variant of question.variants){
          const variantCreated = await this.prisma.variants.create({
            data:{
              question_id: questionCreated.id,
              variant: variant.variant,
              status: variant.status,
            }
          })
        }
      }
    } catch (error) {
       throw new BadRequestException(error.message)
    }
  }
  async getQuestions(test_id:string){
    const questions = await this.prisma.test.findUnique({
      where: {
        id: test_id,
      },
      include: {
        question: {
          include: {
            variants: {
              select: {
                id: true,
                variant: true,
              },
            },
          },
        },
      },
    })
    return questions
  }
}
