import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobAdModule } from './job-ad/job-ad.module';
import { ModeratorSeeder } from './database/seeders/moderator.seeder';
import { MRGEGroupGMBHJobAdFetchService } from './task/mrge-group-gmbh-job-ad-fetch.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should compile the AppModule', () => {
    expect(module).toBeDefined();
    const appModule = module.get(AppModule);
    expect(appModule).toBeInstanceOf(AppModule);
  });

  it('should provide AppController', () => {
    const controller = module.get(AppController);
    expect(controller).toBeInstanceOf(AppController);
  });

  it('should provide AppService', () => {
    const service = module.get(AppService);
    expect(service).toBeInstanceOf(AppService);
  });

  it('should import JobAdModule', () => {
    const jobAdModule = module.get(JobAdModule);
    expect(jobAdModule).toBeDefined();
  });

  it('should provide ModeratorSeeder', () => {
    const seeder = module.get(ModeratorSeeder);
    expect(seeder).toBeInstanceOf(ModeratorSeeder);
  });

  it('should provide MRGEGroupGMBHJobAdFetchService', () => {
    const fetchService = module.get(MRGEGroupGMBHJobAdFetchService);
    expect(fetchService).toBeInstanceOf(MRGEGroupGMBHJobAdFetchService);
  });
});
