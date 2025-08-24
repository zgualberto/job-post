import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAd } from 'database/entities/job-ad.entity';
import { Repository } from 'typeorm';
import { CreateJobAdDto } from './dto/create.dto';
import { Moderator } from 'database/entities/moderator.entity';

@Injectable()
export class JobAdService {
  // load job-ad repository
  constructor(
    @InjectRepository(JobAd)
    private readonly jobAdRepository: Repository<JobAd>,
    @InjectRepository(Moderator)
    private readonly moderatorRepository: Repository<Moderator>,
    private readonly mailerService: MailerService,
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
      metadata: JSON.stringify({
        jobDescriptions: {
          jobDescription: jobAd.jobDescriptions,
        },
        createdAt: new Date(),
      }),
      token: this.generateToken(),
      job_ad_action_id: 2,
    });
    await this.jobAdRepository.save(newJobAd);

    // fetch moderators
    const moderators = await this.moderatorRepository.find();

    // Send email to moderator that there is new Job ad that needs approval
    const moderatorEmails: string[] = [];
    for (const moderator of moderators) {
      moderatorEmails.push(moderator.email);
    }

    await this.mailerService.sendModeratorNotification(
      moderatorEmails,
      newJobAd,
    );

    return newJobAd;
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2);
  }
}
