import { Test, TestingModule } from '@nestjs/testing';
import { JobAdService } from './job-ad.service';
import { MailerService } from '../mailer/mailer.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobAd } from '../database/entities/job-ad.entity';
import { Moderator } from '../database/entities/moderator.entity';
import { CreateJobAdDto } from './dto/create.dto';

const mockJobAd: Partial<JobAd> = {
  id: 1,
  job_ad_action_id: 2,
  token: 'token',
  email: 'test@example.com',
  metadata: '{}',
};

const mockModerator: Partial<Moderator> = {
  id: 1,
  name: 'Mod',
  email: 'mod@example.com',
};

describe('JobAdService', () => {
  let service: JobAdService;
  let jobAdRepository: Repository<JobAd>;
  let moderatorRepository: Repository<Moderator>;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobAdService,
        {
          provide: getRepositoryToken(JobAd),
          useValue: {
            find: jest.fn().mockResolvedValue([mockJobAd]),
            findOne: jest.fn().mockResolvedValue(mockJobAd),
            create: jest.fn().mockReturnValue(mockJobAd),
            save: jest.fn().mockResolvedValue(mockJobAd),
          },
        },
        {
          provide: getRepositoryToken(Moderator),
          useValue: {
            find: jest.fn().mockResolvedValue([mockModerator]),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendModeratorNotification: jest.fn().mockResolvedValue(undefined),
            sendJobAdStatusNotification: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get(JobAdService);
    jobAdRepository = module.get(getRepositoryToken(JobAd));
    moderatorRepository = module.get(getRepositoryToken(Moderator));
    mailerService = module.get(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all job ads', async () => {
    await expect(service.findAll()).resolves.toEqual([mockJobAd]);
    expect(jobAdRepository.find).toHaveBeenCalledWith({
      where: { job_ad_action_id: 1 },
    });
  });

  it('should find job ad by id', async () => {
    await expect(service.findById(1)).resolves.toEqual(mockJobAd);
    expect(jobAdRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if job ad not found by id', async () => {
    (jobAdRepository.findOne as jest.Mock).mockResolvedValueOnce(null);
    await expect(service.findById(999)).rejects.toThrow(
      'Job ad with ID 999 not found',
    );
  });

  it('should get moderate job ad by id', async () => {
    await expect(service.getModerateJobAdById(1, 'token')).resolves.toEqual({
      ...mockJobAd,
      token: null,
    });
    expect(jobAdRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1, token: 'token', job_ad_action_id: 2 },
    });
  });

  it('should throw NotFoundException if moderate job ad not found', async () => {
    (jobAdRepository.findOne as jest.Mock).mockResolvedValueOnce(null);
    await expect(service.getModerateJobAdById(999, 'badtoken')).rejects.toThrow(
      'Job ad with ID 999 not found',
    );
  });

  it('should moderate a job ad and send notification', async () => {
    await expect(service.moderate(1, 'token', 'Approve')).resolves.toEqual({
      ...mockJobAd,
      job_ad_action_id: 1,
      token: null,
    });
    expect(jobAdRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1, token: 'token', job_ad_action_id: 2 },
    });
    expect(jobAdRepository.save).toHaveBeenCalled();
    expect(mailerService.sendJobAdStatusNotification).toHaveBeenCalledWith(
      'test@example.com',
      expect.anything(),
      'Approved',
    );
  });

  it('should moderate a job ad and send rejected notification', async () => {
    await expect(service.moderate(1, 'token', 'Reject')).resolves.toEqual({
      ...mockJobAd,
      job_ad_action_id: 4,
      token: null,
    });
    expect(mailerService.sendJobAdStatusNotification).toHaveBeenCalledWith(
      'test@example.com',
      expect.anything(),
      'Rejected',
    );
  });

  it('should throw NotFoundException if moderate fails', async () => {
    (jobAdRepository.findOne as jest.Mock).mockResolvedValueOnce(null);
    await expect(service.moderate(999, 'badtoken', 'Reject')).rejects.toThrow(
      'Job ad with ID 999 not found',
    );
  });

  it('should create a job ad and notify moderators', async () => {
    const dto: CreateJobAdDto = { jobDescriptions: 'desc' } as any;
    await expect(service.create(dto)).resolves.toEqual({
      message: 'Job ad created successfully',
    });
    expect(jobAdRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ ...dto }),
    );
    expect(jobAdRepository.save).toHaveBeenCalled();
    expect(moderatorRepository.find).toHaveBeenCalled();
    expect(mailerService.sendModeratorNotification).toHaveBeenCalledWith(
      ['mod@example.com'],
      expect.anything(),
    );
  });

  it('should handle error when creating a job ad', async () => {
    (jobAdRepository.save as jest.Mock).mockRejectedValueOnce(
      new Error('Create failed'),
    );
    const dto: CreateJobAdDto = { jobDescriptions: 'desc' } as any;
    await expect(service.create(dto)).rejects.toThrow('Create failed');
  });
});
