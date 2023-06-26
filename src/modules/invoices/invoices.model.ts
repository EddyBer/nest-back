import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { PROJECTS } from '../projects/projects.model';
import { USERS } from '../user/user.model';
import { LINES } from './invoicesLines/lines.model';

@Table({paranoid:true})
export class INVOICES extends Model {

  @Column({primaryKey: true, allowNull: false, autoIncrement: true})
  id : number

  @Column({allowNull: false})
  status: string;

  @Column({allowNull: false})
  publishingDate: Date;

  @Column({allowNull: false})
  paymentMethod: string;

  @Column({allowNull: false})
  paymentDeadline:Date;

  @Column({allowNull: true})
  paymentDate:Date;

  @Column({})
  note:string;

  @ForeignKey(() => PROJECTS)
  @Column({allowNull: false})
  projectId:number;

  @BelongsTo(() => PROJECTS, 'projectId')
  project:PROJECTS

  @ForeignKey(() => USERS)
  @Column({allowNull: false})
  userId:number;

  @BelongsTo(() => USERS, 'userId')
  user:USERS

  @HasMany(() => LINES, {
    onDelete : 'CASCADE'
  })
  lines:LINES[]

}