import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { Employees } from '@Models/dbmodels/employees.model';
import { Positions } from '@Models/dbmodels/positions.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // const isPublic: boolean = this._reflector.get<boolean>(
    //   IS_PUBLIC,
    //   context.getHandler(),
    // );

    // if (isPublic) {
    //   return true;
    // }

    const connection = ctx.getContext().connection;

    const authToken: string =
      connection?.authorization ?? req.headers?.authorization;
    const bearer = authToken.split(' ')[0];
    const token = authToken.split(' ')[1];
    const decoded = jwt.decode(token);

    if ((!authToken && !connection) || bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const employee = await Employees.findOne({
      where: { email: decoded.email },
      include: [
        {
          model: Positions,
        },
      ],
    });
    // const position = await EmployeePositions.findOne({
    //   where: { employeeId: employee.id },
    // });
    try {
      req.user = {
        ...decoded,
        ...employee,
      };

      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
