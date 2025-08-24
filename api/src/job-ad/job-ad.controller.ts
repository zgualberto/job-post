import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { JobAd } from '../database/entities/job-ad.entity';
import { JobAdService } from './job-ad.service';
import { CreateJobAdDto } from './dto/create.dto';

@Controller('api/job-ads')
export class JobAdController {
  constructor(private readonly jobAdService: JobAdService) {}

  // Endpoint to get all job ads
  @Get()
  async findAll(): Promise<JobAd[]> {
    return this.jobAdService.findAll();
  }

  // Endpoint to get a job ad by id
  @Get(':id')
  async findById(@Param('id') id: number): Promise<JobAd | null> {
    return this.jobAdService.findById(id);
  }

  // Create Job ad
  @Post()
  async create(@Body() dto: CreateJobAdDto): Promise<{ message: string }> {
    return this.jobAdService.create(dto);
  }

  // Get moderate Job ad
  @Get(':id/moderate')
  async getModerateJobAdById(
    @Param('id') id: number,
    @Query('token') token: string,
  ): Promise<JobAd | null> {
    return this.jobAdService.getModerateJobAdById(id, token);
  }

  // Moderate Job ad
  @Patch(':id/moderate')
  async moderate(
    @Param('id') id: number,
    @Body('token') token: string,
    @Body('action') action: 'Approve' | 'Reject',
  ): Promise<JobAd | null> {
    return this.jobAdService.moderate(id, token, action);
  }
}
