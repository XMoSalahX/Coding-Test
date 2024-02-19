import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import RequestWithUser from '../interfaces/requestWithUser.interface';

export const AuthUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = (request as RequestWithUser).user;

  return user;
});
