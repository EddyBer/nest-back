import { Controller, Get, Post,Body, Param, UseGuards,} from '@nestjs/common';
import { UsersService } from './user.service';
import { USERS } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('USER')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: USERS): Promise<USERS> {
    return (await this.usersService.createUser(data));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param() data:{id}): Promise<USERS> {
    return (await this.usersService.getUserById(data.id));
  }
}
