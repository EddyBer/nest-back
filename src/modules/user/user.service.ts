import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { USERS } from './user.model';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USERS)
    private userModel: typeof USERS,
  ) {}

  async findAll(): Promise<USERS[]> {
    return this.userModel.findAll();
  }

  async findOneByMail(email: string): Promise<USERS> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(id : number): Promise<USERS> {
    return this.userModel.findOne({
      where: {
        id,
      },
    })
  }

  async createUser(data:USERS):Promise<USERS> {

    const user = await this.findByEmail(data.email);

    if (user) {
      const errors = [];
      if (user.email === data.email) {
        errors.push({
          param: 'email',
          msg: 'The email is already used',
        });
      }

      throw new BadRequestException(errors);
    }
    
    return await this.userModel.create({
      name: data.name,
      firstname: data.firstname,
      birthdate: data.birthdate,
      adress: data.adress,
      email: data.email,
      phone: data.phone,
      AT: data.AT,
      chargesRate: data.chargesRate,
      password: data.password,
    })
  }

  async findByEmail(
    mail:string,
  ): Promise<USERS> {
    return this.userModel.findOne({ where: { email: mail } });
  }

}