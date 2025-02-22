import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from '../../providers/prisma.service';
import { IUser } from './interface/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser({
    email,
    name,
    phone,
    role,
    password,
  }: IUser): Promise<user> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        phone,
        role,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findOne(id: string): Promise<user> {
    return await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async findUserWithEmail(email: string): Promise<Partial<user>> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findUserWithPhone(phone: string): Promise<Partial<user>> {
    return await this.prisma.user.findFirst({
      where: {
        phone,
      },
    });
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<user> {
    return await this.prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ...data,
      },
    });
  }

  async deleteUser(id: string): Promise<user> {
    return await this.prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async getAllUsers(skip: number, take: number): Promise<user[]> {
    return await this.prisma.user.findMany({
      skip,
      take,
    });
  }
}
