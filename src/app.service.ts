import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { USERS } from './modules/user/user.model';
@Injectable()
export class AppService {

  constructor(private sequelize: Sequelize) {}
}
