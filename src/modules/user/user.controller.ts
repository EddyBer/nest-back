import { Controller, Get, Post,Body,} from '@nestjs/common';
import { UsersService } from './user.service';
import { USERS } from './user.model';

@Controller('USER')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: USERS): Promise<USERS> {
    return (await this.usersService.createUser(data));
  }
}
