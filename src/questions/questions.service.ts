import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto, UpdateQuestionDto } from './dto/create-question.dto';
import { PrismaService } from 'src/prisma.service';
import { AppService } from 'src/app.service';
@Injectable()
export class QuestionsService {
  constructor(private  readonly prisma: PrismaService, private readonly appService:AppService){}
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
      const emailsWaiter = await this.prisma.user.findMany({
        where:{
          employee:{
            isNot:null
          }
        },
        select:{
          email:true
        }
      })
      const emailsWaitersPromises = emailsWaiter.map(async (email)=>{
          try {
            await this.appService.sendMailsNewTest('smirn077@mail.ru', email.email, 'Новый тест в Перчини!', test.name)
          } catch (error) {
          }
      })
      await Promise.all(emailsWaitersPromises)
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
  async deleteQuestion(question_id: string) {
    const question = await this.prisma.test.delete({
      where: {
        id: question_id,
      },
    })

    return question
  }
  async getTestById(test_id:string){
    return await this.prisma.test.findUnique({
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
                status:true
              },
            },
          },
        },
      },
    })
  }
  async updateQuestion( updateQuestionDto: UpdateQuestionDto) {
    console.log('receive', updateQuestionDto)
      const test = await this.prisma.test.update({
        where:{
          id:updateQuestionDto.id
        },
        data:{
          name: updateQuestionDto.name,
        }
      })
      await this.prisma.variants.deleteMany({
        where:{
          question:{
            test_id:test.id
          }
        }
      })
      await this.prisma.question.deleteMany({
        where:{
          test_id:test.id
        }
      })
      for(const question of updateQuestionDto.question){
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
  }
  async getListQuetionsCreatedByManager(managerId:string){
    const questions = await this.prisma.test.findMany({
      where:{
        manager_id:managerId
      },
    })
    return  questions
  }
  async getListAll(){
    const tests = await this.prisma.test.findMany({
        select:{
            id:true,
            name:true
        }
    })
    console.log(tests)
    return tests
}
}
