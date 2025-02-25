import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: {email:string, name:string}) {
    return this.authService.CreateUser(body.email, body.name);
  }
  @Post('login')
  login(@Body() body: {email:string, password:string}){
    return this.authService.Login(body.email, body.password)
    
  }

}