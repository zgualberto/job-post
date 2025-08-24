import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsoleModule } from 'nestjs-console';
import { MRGEGroupGMBHJobAdFetchService } from './task/mrge-group-gmbh-job-ad-fetch.service';
import { ScheduleModule } from '@nestjs/schedule';
import { JobAd } from './database/entities/job-ad.entity';
import { JobAdModule } from './job-ad/job-ad.module';
import { Moderator } from './database/entities/moderator.entity';
import { ModeratorSeeder } from './database/seeders/moderator.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    TypeOrmModule.forFeature([JobAd, Moderator]),
  ],
  controllers: [AppController],
  providers: [AppService, ModeratorSeeder, MRGEGroupGMBHJobAdFetchService],
})
export class AppModule {}
