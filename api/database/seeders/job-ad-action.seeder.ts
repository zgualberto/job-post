import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobAdAction } from 'database/entities/job-ad-action.entity';
import { Command, Console } from 'nestjs-console';
import { Repository } from 'typeorm';

@Console()
@Injectable()
export class JobAdActionSeeder {
  constructor(
    @InjectRepository(JobAdAction)
    private readonly jobAdActionRepository: Repository<JobAdAction>,
  ) {}

  @Command({
    command: 'seed:job-ad-action',
    description: 'Seed the job ad action data',
  })
  async seed() {
    console.log('Checking for existing published job ad action...');
    const existing = await this.jobAdActionRepository.findOne({
      where: [
        { name: 'Published' },
        { name: 'Draft' },
        { name: 'Archived' },
        { name: 'Denied' },
      ],
    });
    if (existing) {
      console.log('Published job ad action already exists. Skipping creation.');
      return;
    }
    const jobAdAction = this.jobAdActionRepository.create([
      { name: 'Published' },
      { name: 'Draft' },
      { name: 'Archived' },
      { name: 'Denied' },
    ]);
    await this.jobAdActionRepository.save(jobAdAction);
    console.log('Seeding job ad action data...');
    process.exit(0);
  }
}
