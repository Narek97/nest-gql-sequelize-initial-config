import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AccessGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const positions = ['Middle', 'Senior', 'Lead'];

    if (!positions.includes(req.user.position.position))
      throw new ForbiddenException('You do not have access to this.');

    return true;
  }
}
