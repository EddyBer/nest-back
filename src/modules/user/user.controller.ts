import { Controller, Get, Post,Body,} from '@nestjs/common';
import { UsersService } from './user.service';
import { USERS } from './user.model';

@Controller('USER')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getUsers(): Promise<USERS[]> {
  //   return this.usersService.findAll();
  // }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: USERS): Promise<USERS> {
    for (const elem in data) {
      
    }
    return (await this.usersService.createUser(data));
  }
}
