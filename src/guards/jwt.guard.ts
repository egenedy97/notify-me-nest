import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded; // Store decoded user information in the request object
      return true;
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return false;
    }
  }
}
