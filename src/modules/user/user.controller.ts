import { Controller, Get, Post,Body, Param,} from '@nestjs/common';
import { UsersService } from './user.service';
import { USERS } from './user.model';

@Controller('USER')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: USERS): Promise<USERS> {
    return (await this.usersService.createUser(data));
  }

  @Get(':id')
  async getUserById(@Param() data:{id}): Promise<USERS> {
    return (await this.usersService.getUserById(data.id));
  }
}
