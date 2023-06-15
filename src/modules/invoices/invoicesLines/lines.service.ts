import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LINES } from './lines.model';

@Injectable()
export class LinesService {
  constructor(
    @InjectModel(LINES)
    private linesModel: typeof LINES,
  ) {}

}