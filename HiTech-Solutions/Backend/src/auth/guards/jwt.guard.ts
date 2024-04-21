import { Observable } from 'rxjs';

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Inside Jwt AuthGuard canActivate');
    return super.canActivate(context) as Observable<boolean>;
  }
  // handleRequest(err, user, info) {
  //   if (err || !user) {
  //     return throwError(() => new UnauthorizedException());
  //   }
  //   return user;
  // }
}
