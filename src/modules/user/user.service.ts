import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { user } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async getAllUsers(skip: number, take: number) {
    return await this.userRepository.getAllUsers(skip, take);
  }

  async updateUser(id: string, updateUserDto: Partial<user>) {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}
