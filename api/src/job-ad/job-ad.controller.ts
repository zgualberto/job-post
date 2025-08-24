import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobAd } from 'database/entities/job-ad.entity';
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
  async create(@Body() dto: CreateJobAdDto): Promise<JobAd> {
    return this.jobAdService.create(dto);
  }
}
