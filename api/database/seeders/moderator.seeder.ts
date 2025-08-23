import { Command, Console } from 'nestjs-console';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Moderator } from '../entities/moderator.entity';

@Console()
@Injectable()
export class ModeratorSeeder {
  constructor(
    @InjectRepository(Moderator)
    private readonly moderatorRepository: Repository<Moderator>,
  ) {}

  @Command({
    command: 'seed:moderator',
    description: 'Seed the moderator data',
  })
  async seed() {
    console.log('Checking for existing admin moderator...');
    const existing = await this.moderatorRepository.findOne({
      where: { email: 'admin@example.com' },
    });
    if (existing) {
      console.log('Admin moderator already exists. Skipping creation.');
      return;
    }
    const moderator = this.moderatorRepository.create({
      name: 'Admin',
      email: 'admin@example.com',
      otp: undefined,
    });
    await this.moderatorRepository.save(moderator);
    console.log('Seeding moderator data...');
    process.exit(0);
  }
}
