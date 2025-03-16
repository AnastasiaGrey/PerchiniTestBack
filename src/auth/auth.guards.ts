// import { Observable } from 'rxjs';
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
// import { promises } from 'dns';

// @Injectable()
// @UseGuards (AuthGuard)
// export class AuthGuard implements CanActivate{
//     async canActivate(context: ExecutionContext): Promise<boolean>{
//         const request = context.switchToHttp().getRequest();
//         const authHeader = request.headers['authorization'];
//         if (!authHeader) {
//             throw new UnauthorizedException('No token provaider')
//         }
//         const token = authHeader.split('')[1]; 
//     }
// }