import { Controller, Get, Post,Body, Param, UseGuards, Delete, Put,} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PROJECTS } from './projects.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('PROJECTS')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getMyProjects(@Param() data:{userId}): Promise<PROJECTS[]> {
    return (await this.projectsService.getMyProjects(data.userId));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':clientsId')
  async getProjectsByClient(@Param() data:{clientsId}): Promise<PROJECTS[]> {
    return (await this.projectsService.getProjectsByClient(data.clientsId));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(@Body() data :PROJECTS):Promise<PROJECTS>{
    return await this.projectsService.createProjects(data)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':projectId')
  async deleteProjects(@Param() data:{projectId}):Promise<number> {
    return await this.projectsService.deleteProjects(data.projectId)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':projectId')
  async upateProject(@Param()id :{projectId}, @Body() data :PROJECTS):Promise<[affectedCount: number]> {
    return await this.projectsService.updateProject(id.projectId,data)
  }

}
