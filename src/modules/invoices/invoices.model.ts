import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { PROJECTS } from '../projects/projects.model';

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

  @Column({allowNull: false})
  paymentDate:Date;

  @Column({})
  note:string;

  @ForeignKey(() => PROJECTS)
  @Column({allowNull: false})
  projectId:number;

  @BelongsTo(() => PROJECTS)
  project:PROJECTS
}