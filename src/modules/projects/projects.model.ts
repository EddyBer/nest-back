import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CLIENTS } from '../clients/clients.model';

@Table({paranoid:true})
export class PROJECTS extends Model {

  @Column({primaryKey: true, allowNull: false, autoIncrement: true})
  id : number

  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  status: string;

  @ForeignKey(() => CLIENTS)
  @Column({allowNull: false})
  clientId:number;

  @BelongsTo(() => CLIENTS)
  user:CLIENTS

}

// PROJECTS.hasOne(CLIENTS)