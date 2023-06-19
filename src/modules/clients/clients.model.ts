import { BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { USERS } from '../user/user.model';
import { PROJECTS } from '../projects/projects.model';

@Table({paranoid:true})
export class CLIENTS extends Model {

  @Column({primaryKey: true, allowNull: false, autoIncrement: true})
  id : number

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: true})
  Contactname: string;

  @Column({allowNull: true})
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

  @BelongsTo(() => USERS, 'id')
  user:USERS

  @HasMany(() => PROJECTS, 'clientId')
  projects:PROJECTS[]

}