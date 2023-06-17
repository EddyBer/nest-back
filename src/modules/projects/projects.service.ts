import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PROJECTS } from './projects.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(PROJECTS)
    private projectsModel: typeof PROJECTS,
  ) {}

  async getMyProjects(userId:number): Promise<PROJECTS[]> {
    return this.projectsModel.findAll({
      where:{
        userId:userId
      }
    });
  }

  async getProjectsByClient(id:number):Promise<PROJECTS[]> {
    return this.projectsModel.findAll({
      where:{
        clientId:id
      }
    })
  }

  async createProjects(data:PROJECTS):Promise<PROJECTS> {
    return this.projectsModel.create({
      name:data.name,
      status:data.status,
      clientId:data.clientId,
      userId:data.userId
    })
  }

  async deleteProjects(projectId:number): Promise<number> {
    return this.projectsModel.destroy({
      where:{
        id:projectId
      }
    })
  }

  async updateProject(projectId:number, data:PROJECTS):Promise<[affectedCount: number]> {
    return this.projectsModel.update({
      name:data.name,
      status:data.status,
      clientId:data.clientId
    },{
      where:{
        id:projectId
      }
    })
  }
}