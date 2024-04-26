import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import { UserService } from '../modules/user/user.service';
import * as jwt from 'jsonwebtoken';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id; // Access id property of the decoded payload

        // Find the user by ID
        const user = await this.userService.findOne(userId);
        req.currentUser = user;
      } catch (error) {
        // Handle token verification errors
        console.error('Error verifying token:', error.message);
      }
    }

    next();
  }
}
