import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { INVOICES } from './invoices.model';

@Module({
  imports: [SequelizeModule.forFeature([INVOICES])],
  providers: [InvoicesService],
  controllers: [InvoicesController],
  exports: [InvoicesService],
})
export class InvoicesModule {}