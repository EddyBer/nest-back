import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PROJECTS } from './projects.model';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [SequelizeModule.forFeature([PROJECTS])],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}