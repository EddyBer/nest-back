import { Controller, Get, Post,Body, Param, UseGuards, Delete, Put,} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { InvoicesService } from './invoices.service';
import { INVOICES } from './invoices.model';

@Controller('INVOICES')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createInvoice(@Body() data :INVOICES):Promise<INVOICES>{
    return await this.invoicesService.createInvoice(data)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':invoiceId')
  async deleteClient(@Param() data :{invoiceId}):Promise<number>{
    return await this.invoicesService.deleteInvoice(data.invoiceId)
  }

  
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllInvoice(): Promise<INVOICES[]> {
    return (await this.invoicesService.getAllInvoices());
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getMyInvoices(@Param() data :{userId}): Promise<INVOICES[]> {
    return (await this.invoicesService.getMyInvoices(data.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':projectsId')
  async getInvoiceByProjects(@Param() data :{projectsId}): Promise<INVOICES[]> {
    return (await this.invoicesService.getAllInvoicesByProject(data.projectsId));
  }

  @UseGuards(JwtAuthGuard)
  @Put(':invoiceId')
  async updateClient(@Param()id :{invoiceId}, @Body() data :INVOICES):Promise<[affectedCount: number]> {
    return await this.invoicesService.updateInvoice(id.invoiceId, data)
  }

}