import { Controller, Get, Post,Body, Param, UseGuards,} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PROJECTS } from './projects.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('PROJECTS')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProjects(): Promise<PROJECTS[]> {
    return (await this.projectsService.getProjects());
  }
}
