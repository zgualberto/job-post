import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAd } from 'database/entities/job-ad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobAdService {
  // load job-ad repository
  constructor(
    @InjectRepository(JobAd)
    private readonly jobAdRepository: Repository<JobAd>,
  ) {}

  // load all job ads
  async findAll(): Promise<JobAd[]> {
    return this.jobAdRepository.find({
      where: {
        job_ad_action_id: 1,
      },
    });
  }
}
