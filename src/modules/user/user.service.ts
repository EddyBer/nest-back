import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { USERS } from './user.model';

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
    const errors = [];

    if (user) {
      if (user.email === data.email) {
        errors.push({
          param: 'email',
          msg: 'The email is already used',
        });
      }
    }

    if (data.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/) ==  null) {
      errors.push({
        param: 'password',
        msg: 'The password does not match the rules (10 carac, 1 uppercase, 1 number, 1 special car)',
      });
    }

    if (data.name.trim() == '') {
      errors.push({
        param: 'name',
        msg: 'Name can\'t be empty ',
      });
    }

    if (data.firstname.trim() == '') {
      errors.push({
        param: 'firstname',
        msg: 'Firstname can\'t be empty ',
      });
    }

    if (data.adress.trim() == '') {
      errors.push({
        param: 'adress',
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

    if (!isNaN(data.birthdate.valueOf())) {
      errors.push({
        param: 'birthdate',
        msg: 'Birthdate can\'t be empty ',
      });
    }

    if (errors.length == 0) {
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
    } else {
      throw new BadRequestException(errors);
    }
  }

  async findByEmail(
    mail:string,
  ): Promise<USERS> {
    return this.userModel.findOne({ where: { email: mail } });
  }

  async updateUser (id:number, data:USERS):Promise<[affectedCount: number]>{

    const user = await this.findByEmail(data.email);

    if (user && user.id != id) {
      const errors = [];
      if (user.email === data.email) {
        errors.push({
          param: 'email',
          msg: 'The email is already used',
        });
      }
      throw new BadRequestException(errors);
    }
    
    return this.userModel.update({
      name:data.name,
      firstname:data.firstname,
      birthdate:data.birthdate,
      adress:data.adress,
      email:data.email,
      phone:data.phone,
      AT:data.AT,
      chargesRatez:data.chargesRate,
    },
    {
      where: {id:id}
    })
  }
}