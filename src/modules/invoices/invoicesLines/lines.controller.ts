import { Controller, Get, Post,Body, Param, UseGuards, Delete, Put,} from '@nestjs/common';
import { LinesService } from './lines.service';

@Controller('CLIENTS')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

}