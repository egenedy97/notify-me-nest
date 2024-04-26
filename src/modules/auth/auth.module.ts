import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../providers/prisma.module';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, UserModule],
})
export class AuthModule {}
