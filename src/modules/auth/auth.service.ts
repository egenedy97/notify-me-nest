import {
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { IUser } from '../user/user.interface';
import { User, userRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { DataStoredInToken } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async register(user: IUser): Promise<User> {
    try {
      const findUser = await this.userRepository.findUserWithEmail(user.email);
      if (findUser) {
        throw new UnauthorizedException('This email is already in use');
      }
      return await this.userRepository.createUser(user);
    } catch (error) {
      if (error.response) {
        // Handling Axios error response
        throw new HttpException(error.response.data, error.response.status);
      } else if (error instanceof UnauthorizedException) {
        // Handling specific exception
        throw error;
      } else {
        // Handling generic error
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async login(user: { email: string; password: string }): Promise<{
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      phone: string;
      role: userRole;
    };
  }> {
    try {
      const findUser = await this.userRepository.findUserWithEmail(user.email);
      if (!findUser) {
        throw new UnauthorizedException('User not found');
      }

      const isPasswordMatching: boolean = await bcrypt.compare(
        user.password,
        findUser.password,
      );
      if (!isPasswordMatching) {
        throw new UnauthorizedException('Incorrect password');
      }

      const token = await this.createToken(findUser.id);

      return {
        token: token,
        user: {
          name: findUser.name,
          email: findUser.email,
          role: findUser.role,
          phone: findUser.phone,
          id: findUser.id,
        },
      };
    } catch (error) {
      if (error.response) {
        // Handling Axios error response
        throw new HttpException(error.response.data, error.response.status);
      } else if (error instanceof UnauthorizedException) {
        // Handling specific exception
        throw error;
      } else {
        // Handling generic error
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async createToken(id: number): Promise<string> {
    const dataStoredInToken: DataStoredInToken = { id: id };
    return this.jwtService.signAsync(dataStoredInToken);
  }
}
