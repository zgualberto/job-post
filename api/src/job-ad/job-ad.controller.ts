import { Controller, Get } from '@nestjs/common';
import { JobAd } from 'database/entities/job-ad.entity';
import { JobAdService } from './job-ad.service';

@Controller('api/job-ads')
export class JobAdController {
  constructor(private readonly jobAdService: JobAdService) {}

  // Endpoint to get all job ads
  @Get()
  async findAll(): Promise<JobAd[]> {
    console.log('Fetching all job ads');
    return this.jobAdService.findAll();
  }
}
