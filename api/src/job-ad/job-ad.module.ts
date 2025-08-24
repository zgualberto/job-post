import { Module } from '@nestjs/common';
import { JobAdController } from './job-ad.controller';
import { JobAdService } from './job-ad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobAd } from 'database/entities/job-ad.entity';
import { Moderator } from 'database/entities/moderator.entity';
import { AppMailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [AppMailerModule, TypeOrmModule.forFeature([JobAd, Moderator])],
  controllers: [JobAdController],
  providers: [JobAdService],
})
export class JobAdModule {}
