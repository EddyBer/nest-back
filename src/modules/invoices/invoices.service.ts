import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { INVOICES } from './invoices.model';
import { identity } from 'rxjs';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(INVOICES)
    private invoicesModel: typeof INVOICES,
  ) {}

  async createInvoice(data:INVOICES): Promise<INVOICES> {
    return this.invoicesModel.create({
        status : data.status,
        publishingDate : data.publishingDate,
        paymentMethod: data.paymentMethod,
        paymentDeadline : data.paymentDeadline,
        paymentDate : data.paymentDate,
        note : data.note,
        projectId : data.projectId,
        userId : data.userId
    })
  }

  async getMyInvoices(userId: number):Promise<INVOICES[]> {
    return this.invoicesModel.findAll({
      where:{
        userId: userId
    }
    })
  }

  async deleteInvoice(InvoiceId: number):Promise<number> {
    return this.invoicesModel.destroy({
        where:{
            id:InvoiceId
        }
    })
  }

  async getLast():Promise<INVOICES> {
    return this.invoicesModel.max('id',{})
  }

  async getAllInvoices():Promise<INVOICES[]> {
    return this.invoicesModel.findAll()
  }

  async getAllInvoicesByProject(id:number):Promise<INVOICES[]> {
    return this.invoicesModel.findAll({
        where:{
            projectId: id
        }
    })
  }

  async updateInvoice(id:number, data: INVOICES):Promise<[affectedCount: number]> {
    return this.invoicesModel.update({
        status : data.status,
        publishingDate : data.publishingDate,
        paymentMethod: data.paymentMethod,
        paymentDeadline : data.paymentDeadline,
        paymentDate : data.paymentDate,
        note : data.note,
        projectId : data.projectId
    },
    {
        where:{id:id}
    })
  }
}