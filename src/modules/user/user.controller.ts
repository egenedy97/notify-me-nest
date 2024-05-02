import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  Put,
  Delete,
  Body,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../../guards/jwt.guard';

import { User } from '@prisma/client';
import { CurrentUser } from '../../decorators/currentUser-decorator';
import { updateUserDto } from './DTO';
import { Roles } from 'src/decorators/roles.decorator';
import { UserGuard } from 'src/guards/user.guard';

@UseGuards(JwtGuard, UserGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles('ADMIN', 'USER')
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
  @Roles('ADMIN')
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  @Roles('ADMIN')
  async getAllUsers(@Query('skip') skip: string, @Query('take') take: string) {
    const skipInt = parseInt(skip);
    const takeInt = parseInt(take);
    if (isNaN(skipInt) || isNaN(takeInt)) {
      throw new BadRequestException(
        'Skip and take parameters must be integers',
      );
    }
    const users = await this.userService.getAllUsers(skipInt, takeInt);
    if (!users.length) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  @Put('/:id')
  @Roles('ADMIN')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: updateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  @Roles('ADMIN')
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
