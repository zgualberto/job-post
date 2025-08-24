import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAd } from '../database/entities/job-ad.entity';
import { Repository } from 'typeorm';
import { CreateJobAdDto } from './dto/create.dto';
import { Moderator } from '../database/entities/moderator.entity';

const PUBLISHED = 1;
const DRAFT = 2;
const REJECTED = 4;

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
        job_ad_action_id: PUBLISHED,
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

  // moderate job ad by id
  async getModerateJobAdById(id: number, token: string): Promise<JobAd | null> {
    const jobAd = await this.jobAdRepository.findOne({
      where: {
        id,
        token,
        job_ad_action_id: 2,
      },
    });
    if (!jobAd) {
      throw new NotFoundException(`Job ad with ID ${id} not found`);
    }

    // Here you can add your moderation logic
    // For example, you might want to check the token or update the job ad status

    return {
      ...jobAd,
      token: null,
    };
  }

  // moderate job ad action
  async moderate(
    id: number,
    token: string,
    action: 'Approve' | 'Reject',
  ): Promise<JobAd | null> {
    const jobAd = await this.jobAdRepository.findOne({
      where: {
        id,
        token,
        job_ad_action_id: DRAFT,
      },
    });
    if (!jobAd) {
      throw new NotFoundException(`Job ad with ID ${id} not found`);
    }

    // Here you can add your moderation logic
    // For example, you might want to check the token or update the job ad status

    jobAd.job_ad_action_id = action === 'Approve' ? PUBLISHED : REJECTED;
    jobAd.token = null;
    await this.jobAdRepository.save(jobAd);

    if (jobAd.email) {
      await this.mailerService.sendJobAdStatusNotification(
        jobAd.email,
        jobAd,
        action === 'Approve' ? 'Approved' : 'Rejected',
      );
    }

    return jobAd;
  }

  // create a job ad
  async create(jobAd: CreateJobAdDto): Promise<{ message: string }> {
    // check if user based on email has published job ads
    const existingJobAds = await this.jobAdRepository.find({
      where: {
        email: jobAd.email,
        job_ad_action_id: PUBLISHED,
      },
    });

    if (existingJobAds.length > 0) {
      const newJobAd = this.jobAdRepository.create({
        ...jobAd,
        metadata: JSON.stringify({
          jobDescriptions: {
            jobDescription: jobAd.jobDescriptions,
          },
          createdAt: new Date(),
        }),
        token: null,
        job_ad_action_id: 1,
      });

      await this.jobAdRepository.save(newJobAd);

      return {
        message: 'Job ad created successfully',
      };
    }
    const newJobAd = this.jobAdRepository.create({
      ...jobAd,
      metadata: JSON.stringify({
        jobDescriptions: {
          jobDescription: jobAd.jobDescriptions,
        },
        createdAt: new Date(),
      }),
      token: this.generateToken(),
      job_ad_action_id: DRAFT,
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

    return {
      message: 'Job ad created successfully',
    };
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2);
  }
}
