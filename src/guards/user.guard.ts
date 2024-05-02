import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userRole } from '@prisma/client';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<userRole[]>('roles', context.getHandler());
    if (!roles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    const role: userRole = request.currentUser.role;
    return roles.includes(role);
  }
}
