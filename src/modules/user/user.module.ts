import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from '../../providers/prisma.module';
import { CurrentUserMiddleware } from '../../middlewares/current-user.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [PrismaModule],
  exports: [UserRepository],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
