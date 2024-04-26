import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from '../../decorators/currentUser-decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
