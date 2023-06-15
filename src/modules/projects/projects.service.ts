import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PROJECTS } from './projects.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(PROJECTS)
    private projectsModel: typeof PROJECTS,
  ) {}

  async getProjects(): Promise<PROJECTS[]> {
    return this.projectsModel.findAll();
  }
}