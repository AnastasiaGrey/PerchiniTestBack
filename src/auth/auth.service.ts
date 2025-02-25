import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import {genSalt, hash, compare} from 'bcrypt'
import {AppService} from '../app.service'
@Injectable()
export class AuthService {
    constructor(private  prisma: PrismaService, private readonly AppService:AppService ) {}

    async CreateUser(email:string, name:string){
        const password = randomBytes(12).toString('base64').slice(0, 12);
        const salt = 10
        const hashed = await hash(password, salt)
        console.log (hashed)
        const new_user = await this.prisma.employee.create({
            data:{
                email,
                name,
                password:hashed
            }
        })
        if(new_user){
            await this.AppService.sendMail('smirn077@mail.ru', new_user.email, 'Пароль для доступа к Перчини Тест', password)
        }
        
        return {...new_user, unhashed:password}
    }

    async Login(email:string, password:string){
    const user = await this.prisma.employee.findUnique({
        where:{
            email
        }
    })

    if(!user){
        throw new BadRequestException("Сотрудник не найден")
    }

    const res = await compare(password, user.password)
    if (res == true){
        
        return "Success"
    }
    throw new BadRequestException("Неправильный логин или пароль")
    }
}
