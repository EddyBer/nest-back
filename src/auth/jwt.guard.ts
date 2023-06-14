import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error, context: any, status?: any) {
    if (user.type != 'access') {
      throw new UnauthorizedException();
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
