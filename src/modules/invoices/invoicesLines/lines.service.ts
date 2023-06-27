import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LINES } from './lines.model';
import { INVOICES } from '../invoices.model';

@Injectable()
export class LinesService {
  constructor(
    @InjectModel(LINES)
    private linesModel: typeof LINES,
  ) {}

  async createLine(data:LINES): Promise<LINES> {
    return this.linesModel.create({
        libelle : data.libelle,
        price : data.price,
        quantity: data.quantity,
        invoicesId : data.invoicesId,
    })
  }

  async getLines(invoiceId: number):Promise<LINES[]> {
    return this.linesModel.findAll({
      where:{
        invoicesId: invoiceId
      },
      include: [INVOICES]
    })
  }

  async deleteInvoiceLine(LineId: number):Promise<number> {
    return this.linesModel.destroy({
        where:{
            id:LineId
        }
    })
  }

}