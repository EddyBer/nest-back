import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { USERS } from '../user/user.model';

@Table({paranoid:true})
export class CLIENTS extends Model {

  @Column({primaryKey: true, allowNull: false, autoIncrement: true})
  id : number

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  Contactname: string;

  @Column({allowNull: false})
  firstname: string;

  @Column({allowNull: false})
  adress:string;

  @Column({allowNull: false})
  phone:string;

  @Column({allowNull: false})
  email:string;

  @Column({allowNull: false})
  type:number;

  @Column({allowNull: false})
  SIRET:string;

  @ForeignKey(() => USERS)
  @Column({allowNull: false})
  userId:number;

  @BelongsTo(() => USERS)
  user:USERS
}