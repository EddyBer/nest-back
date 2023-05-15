import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
