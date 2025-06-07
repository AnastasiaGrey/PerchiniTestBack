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
        
        const user = await this.prisma.user.findUnique({
            where:{
                email: email,
            }
        });
        if(user){
            throw new BadRequestException("Сотрудник с таким email уже есть")

        }
        let new_user
        if (role=='Manager'){
            new_user = await this.prisma.user.create({
                data:{
                    email: email,
                    password:hashed,
                    name: name,
                    manager:{
                        create:{

                        }
                    }
                }
                
            })
        }
        else{
            new_user = await this.prisma.user.create({
                data:{
                    email: email,
                    password:hashed,
                    name: name,
                    employee:{
                        create:{

                        }
                    }
                }
                
            })
        }
        
        
        if(new_user){
            await this.AppService.sendMail('smirn077@mail.ru', new_user.email, 'Пароль для доступа к Перчини Тест', password)
            }      
        return {...new_user, unhashed:password}
        }

    async Login(email:string, password:string){
    const user = await this.prisma.user.findUnique({
        where:{
            email
        },
        include:{
            manager:true,
            employee:true
        }
    })
    console.log(user)
    if(!user){
        throw new BadRequestException("Сотрудник не найден")
    }

    const res = await compare(password, user.password)
    if (res == true){
        const secret = process.env.JWT_SECRET
        const acessToken=sign({ data:user }, secret, {expiresIn: 60 * 60})
        const refreshToken=sign({ data:user }, secret, {expiresIn: 60 * 60*24})

        return {acessToken, refreshToken, user}
    }

    throw new BadRequestException("Неправильный логин или пароль")
    }
}


