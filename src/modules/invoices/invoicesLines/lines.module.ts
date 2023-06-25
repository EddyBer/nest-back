import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LINES } from './lines.model';
import { LinesController } from './lines.controller';
import { LinesService } from './lines.service';

@Module({
  imports: [SequelizeModule.forFeature([LINES])],
  providers: [LinesService],
  controllers: [LinesController],
  exports: [LinesService],
})
export class LinesModule {}