import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { INVOICES } from '../invoices.model';

@Table({paranoid:true})
export class LINES extends Model {

  @Column({primaryKey: true, allowNull: false, autoIncrement: true})
  id : number

  @Column({allowNull: false})
  libelle: string;

  @Column({allowNull: false})
  price: number;

  @Column({allowNull: false})
  quantity: number;

  @ForeignKey(() => INVOICES)
  @Column({allowNull: false})
  invoicesId:number;

  @BelongsTo(() => INVOICES)
  invoices:INVOICES
}