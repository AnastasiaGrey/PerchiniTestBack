import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TestsService {
    constructor(private prisma: PrismaService) {}
    async getList(managerId:string){
        return await this.prisma.test.findMany({
            where:{
                manager_id:managerId
            }
        })
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
    async getAllList(){
        const tests = await this.prisma.test.findMany({
            select:{
                id:true,
                name:true
            }
        })
        console.log(tests)
        return tests
    
    }
    async getListFinished(waiter_id:string){
        return await this.prisma.test.findMany({
            where:{
                results:{
                    some:{
                        employee_id:waiter_id
                    }
                }
            }
        })
    }
    async getListNotStarted(waiter_id:string){
        return await this.prisma.test.findMany({
            where: {
                results: {
                  none: {
                    employee_id: waiter_id
                  }
                }
              },
        })
    }
}
    