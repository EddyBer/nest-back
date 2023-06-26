import { Controller, Get, Post,Body, Param, UseGuards, Delete, Put,} from '@nestjs/common';
import { LinesService } from './lines.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LINES } from './lines.model';

@Controller('LINES')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createInvoice(@Body() data :LINES):Promise<LINES>{
    return await this.linesService.createLine(data)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':invoicesId')
  async getLines(@Param() data :{invoicesId}): Promise<LINES[]> {
    return (await this.linesService.getLines(data.invoicesId))
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':lineId')
  async deleteClient(@Param() data :{lineId}):Promise<number>{
    return await this.linesService.deleteInvoiceLine(data.lineId)
  }

}