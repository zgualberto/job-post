import { Module } from '@nestjs/common';
import { JobAdController } from './job-ad.controller';
import { JobAdService } from './job-ad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAd } from 'database/entities/job-ad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobAd])],
  controllers: [JobAdController],
  providers: [JobAdService],
})
export class JobAdModule {}
