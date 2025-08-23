import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsoleModule } from 'nestjs-console';
import { ModeratorSeeder } from 'database/seeders/moderator.seeder';
import { Moderator } from 'database/entities/moderator.entity';
import { JobAdActionSeeder } from 'database/seeders/job-ad-action.seeder';
import { JobAdAction } from 'database/entities/job-ad-action.entity';
import { MRGEGroupGMBHJobAdFetchService } from './task/mrge-group-gmbh-job-ad-fetch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { JobAd } from 'database/entities/job-ad.entity';
import { JobAdModule } from './job-ad/job-ad.module';

@Module({
  imports: [
    ConsoleModule,
    JobAdModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: false,
      entities: ['../database/entities/**/*.ts'],
      migrations: ['../database/migrations/**/*.ts'],
    }),
    TypeOrmModule.forFeature([JobAdAction, JobAd, Moderator]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ModeratorSeeder,
    JobAdActionSeeder,
    MRGEGroupGMBHJobAdFetchService,
  ],
})
export class AppModule {}
