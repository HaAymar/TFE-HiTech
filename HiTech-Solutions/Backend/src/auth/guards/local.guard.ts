import { Observable } from 'rxjs';

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('Hello, World');
    console.log('guard content', super.canActivate(context));
    return super.canActivate(context);
  }
}
