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

    const errors = [];

    if (data.name.trim() == '') {
      errors.push({
        param: 'name',
        msg: 'Name can\'t be empty ',
      });
    }

    if (data.type == 1) {
      if (data.firstname == undefined) {
        errors.push({
          param: 'firstname',
          msg: 'Firstname can\'t be undefined',
        });
      } else {
        if (data.firstname.trim() == '') {
          errors.push({
            param: 'firstname',
            msg: 'Firstname can\'t be empty if you choose type private',
          });
            }
      }
    }

    if (data.type == 2) {
      if(data.Contactname == undefined) {
        errors.push({
          param: 'Contactname',
          msg: 'Contactname can\'t be undefined',
        });
      } else {
        if (data.Contactname.trim() == '') {
        errors.push({
          param: 'Contactname',
          msg: 'Contactname can\'t be empty if you choose type company',
        });
          }
        }
      }

      if (data.adress.trim() == '') {
        errors.push({
          param: 'address',
          msg: 'Address can\'t be empty ',
        });
      }
  
      if (data.phone.trim() == '') {
        errors.push({
          param: 'phone',
          msg: 'Phone number can\'t be empty ',
        });
      }

      if (data.email.trim() == '') {
        errors.push({
          param: 'email',
          msg: 'Email can\'t be empty ',
        });
      }

      if (data.SIRET.trim() == '') {
        errors.push({
          param: 'SIRET',
          msg: 'SIRET can\'t be empty ',
        });
      }

    if(errors.length == 0) {
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
    } else {
      throw new BadRequestException(errors);
    }
  }

  async deleteClient(clientId: string): Promise<number> {

    const errors = [];
    const user = await this.findById(clientId)
    let hasProjects = false

    await user.$get('projects').then((values) => {
      if (values.length > 0) {
        hasProjects = true
        errors.push({
          param:'Has projects',
          msg: 'Impossible to delete this client : He has projects register',
        });
      }
    })

    if (errors.length == 0 && !hasProjects) {
      return this.clientsModel.destroy({
        where:{
          id:clientId
        }
      })
    } else {
      throw new BadRequestException(errors);
    }
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
  
  async findBySIRET(
    SIRET:string,
  ): Promise<CLIENTS> {
    return this.clientsModel.findOne({ where: { SIRET: SIRET } });
  }

  async findById(
    id:string,
  ): Promise<CLIENTS> {
    return this.clientsModel.findOne({ where: { id: id } });
  }
}