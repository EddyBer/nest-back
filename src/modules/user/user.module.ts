import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { USERS } from './user.model';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([USERS])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}