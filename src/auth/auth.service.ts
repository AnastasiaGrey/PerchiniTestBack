import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import {genSalt, hash, compare} from 'bcrypt'
import {AppService} from '../app.service'
import {sign} from 'jsonwebtoken'
import { Roles } from './auth.type';

@Injectable()

export class AuthService {
    constructor(private  prisma: PrismaService, private readonly AppService:AppService ) {}

    async CreateUser(email:string, name:string, role: Roles){
        if(!email || !name || !role){
            throw new BadRequestException('Вы пропустили обязательные поля')
        }
        const password = randomBytes(12).toString('base64').slice(0, 12);
        const salt = 10
        const hashed = await hash(password, salt)
        console.log (hashed)
        
        if (role === 'Waiter'){
            const user_waiter = await this.prisma.employee.findUnique({
                where:{
                    email: email,
                }
            });
        if (user_waiter){
            throw new BadRequestException("Сотрудник с таким email уже есть")
        }
        }
        if (role === 'Manager'){
            const user_manager = await this.prisma.manager.findUnique({
                where:{
                    email: email,
                }
            });
            if (user_manager){
                throw new BadRequestException("Сотрудник с таким email уже есть")
            }
            const new_user = await this.prisma.manager.create({
                data:{
                    email,
                    name,
                    password:hashed
                }
            })
            if(new_user){
                await this.AppService.sendMail('smirn077@mail.ru', new_user.email, 'Пароль для доступа к Перчини Тест', password)
                }      
            return {...new_user, unhashed:password}}
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
        const secret = process.env.JWT_SECRET
        const acessToken=sign({ data:user }, secret, {expiresIn: 60 * 60})
        const refreshToken=sign({ data:user }, secret, {expiresIn: 60 * 60*24})

        return {acessToken, refreshToken}
    }

    throw new BadRequestException("Неправильный логин или пароль")
    }
}


