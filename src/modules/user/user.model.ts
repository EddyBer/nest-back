import { Column, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { CLIENTS } from '../clients/clients.model';

@Table({paranoid:true})
export class USERS extends Model {

  @Column({primaryKey: true, allowNull: false, autoIncrement: true})
  id : number

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  firstname: string;

  @Column({allowNull: false})
  birthdate:Date;

  @Column({allowNull: false})
  adress:string;

  @Column({allowNull: false})
  email:string;

  @Column({allowNull: false})
  phone:string;

  @Column({allowNull: false})
  AT:number;

  @Column({allowNull: false})
  chargesRate:number;

  @Column({allowNull: false,
          set(value:string) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
          }})
  password:string;

}