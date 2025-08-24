import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAd } from 'database/entities/job-ad.entity';
import { Repository } from 'typeorm';
import { CreateJobAdDto } from './dto/create.dto';

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

  // load a job ad by id
  async findById(id: number): Promise<JobAd | null> {
    const jobAd = await this.jobAdRepository.findOne({
      where: {
        id,
      },
    });
    if (!jobAd) {
      throw new NotFoundException(`Job ad with ID ${id} not found`);
    }

    return jobAd;
  }

  // create a job ad
  async create(jobAd: CreateJobAdDto): Promise<JobAd> {
    const newJobAd = this.jobAdRepository.create({
      ...jobAd,
      job_ad_action_id: 2,
    });
    return this.jobAdRepository.save(newJobAd);
  }
}
