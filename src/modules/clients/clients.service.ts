import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CLIENTS } from './clients.model';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(CLIENTS)
    private clientsModel: typeof CLIENTS,
  ) {}

  async getClientsByUserId(userId: string): Promise<CLIENTS[]> {
    return this.clientsModel.findAll({
      where: {
        userId,
      },
    });
  }

  async creteClient(data:CLIENTS): Promise<CLIENTS> {
    return this.clientsModel.create({
      name:data.name,
      Contactname:data.Contactname,
      firstname:data.firstname,
      adress:data.adress,
      phone:data.phone,
      email:data.email,
      type:data.type,
      SIRET:data.SIRET,
      userId:data.userId
    })
  }

  async deleteClient(clientId: string): Promise<number> {
    return this.clientsModel.destroy({
      where:{
        id:clientId
      }
    })
  }

  async updateClient(id:number,data:CLIENTS): Promise<[affectedCount: number]> {
    return this.clientsModel.update({
      name:data.name,
      Contactname:data.Contactname,
      firstname:data.firstname,
      adress:data.adress,
      phone:data.phone,
      email:data.email,
      type:data.type,
      SIRET:data.SIRET,
      userId:data.userId
    },
    {
      where: {id:id}
    })
  }
}