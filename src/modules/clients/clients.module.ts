import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CLIENTS } from './clients.model';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [SequelizeModule.forFeature([CLIENTS])],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService],
})
export class ClientsModule {}