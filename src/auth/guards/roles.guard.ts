import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/entities/user/user.service';
import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: {
    role: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<IGetUserAuthInfoRequest>();
    if (request.user.role === 'admin') {
      return true;
    }

    return false;
  }
}
