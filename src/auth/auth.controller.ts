import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './auth.type';
interface Register{email:string, name:string, role: Roles}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: Register) {
    console.log(body)
    return this.authService.CreateUser(body.email, body.name, body.role);
  }
  @Post('login')
  login(@Body() body: {email:string, password:string}){
    return this.authService.Login(body.email, body.password)

  }

}