import { Controller, Get, Post,Body, Param, UseGuards, Delete, Put,} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CLIENTS } from './clients.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('CLIENTS')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getClientsByUserId(@Param() data:{userId}): Promise<CLIENTS[]> {
    return (await this.clientsService.getClientsByUserId(data.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createClient(@Body() data :CLIENTS):Promise<CLIENTS>{
    return await this.clientsService.creteClient(data)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':clientId')
  async deleteClient(@Param() data :{clientId}):Promise<number>{
    return await this.clientsService.deleteClient(data.clientId)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':clientId')
  async updateClient(@Param()id :{clientId}, @Body() data :CLIENTS):Promise<[affectedCount: number]> {
    return await this.clientsService.updateClient(id.clientId, data)
  }

}