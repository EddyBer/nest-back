import { Column, Model, Table } from 'sequelize-typescript';
import { USERS } from '../user/user.model';
import { CLIENTS } from '../clients/clients.model';

@Table({paranoid:true})
export class PROJECTS extends Model {

  @Column({primaryKey: true, allowNull: false, autoIncrement: true})
  id : number

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  status: string;

}

// PROJECTS.hasOne(CLIENTS)