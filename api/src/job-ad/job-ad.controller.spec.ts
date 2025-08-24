import { Test, TestingModule } from '@nestjs/testing';
import { JobAdController } from './job-ad.controller';
import { JobAdService } from './job-ad.service';
import { CreateJobAdDto } from './dto/create.dto';
import { JobAd } from '../database/entities/job-ad.entity';

describe('JobAdController', () => {
  let controller: JobAdController;
  let service: JobAdService;

  const mockJobAd: JobAd = {
    id: 1,
    job_ad_action_id: 1,
    token: 'token',
    email: 'test@example.com',
    metadata: '{}',
    // ...other fields as needed
  } as JobAd;

  const mockService = {
    findAll: jest.fn().mockResolvedValue([mockJobAd]),
    findById: jest.fn().mockResolvedValue(mockJobAd),
    create: jest
      .fn()
      .mockResolvedValue({ message: 'Job ad created successfully' }),
    getModerateJobAdById: jest.fn().mockResolvedValue(mockJobAd),
    moderate: jest.fn().mockResolvedValue(mockJobAd),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobAdController],
      providers: [{ provide: JobAdService, useValue: mockService }],
    }).compile();

    controller = module.get<JobAdController>(JobAdController);
    service = module.get<JobAdService>(JobAdService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all job ads', async () => {
    await expect(controller.findAll()).resolves.toEqual([mockJobAd]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a job ad by id', async () => {
    await expect(controller.findById(1)).resolves.toEqual(mockJobAd);
    expect(service.findById).toHaveBeenCalledWith(1);
  });

  it('should create a job ad', async () => {
    const dto: CreateJobAdDto = {
      /* mock fields */
    } as CreateJobAdDto;
    await expect(controller.create(dto)).resolves.toEqual({
      message: 'Job ad created successfully',
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get moderate job ad by id', async () => {
    await expect(controller.getModerateJobAdById(1, 'token')).resolves.toEqual(
      mockJobAd,
    );
    expect(service.getModerateJobAdById).toHaveBeenCalledWith(1, 'token');
  });

  it('should moderate a job ad', async () => {
    await expect(controller.moderate(1, 'token', 'Approve')).resolves.toEqual(
      mockJobAd,
    );
    expect(service.moderate).toHaveBeenCalledWith(1, 'token', 'Approve');
  });

  it('should throw NotFoundException if job ad not found by id', async () => {
    const notFoundError = new Error('Job ad with ID 999 not found');
    notFoundError.name = 'NotFoundException';
    (service.findById as jest.Mock).mockRejectedValueOnce(notFoundError);
    await expect(controller.findById(999)).rejects.toThrow(
      'Job ad with ID 999 not found',
    );
    expect(service.findById).toHaveBeenCalledWith(999);
  });

  it('should handle error when creating a job ad', async () => {
    const dto: CreateJobAdDto = {} as CreateJobAdDto;
    (service.create as jest.Mock).mockRejectedValueOnce(
      new Error('Create failed'),
    );
    await expect(controller.create(dto)).rejects.toThrow('Create failed');
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should throw NotFoundException if moderate job ad not found', async () => {
    const notFoundError = new Error('Job ad with ID 999 not found');
    notFoundError.name = 'NotFoundException';
    (service.getModerateJobAdById as jest.Mock).mockRejectedValueOnce(
      notFoundError,
    );
    await expect(
      controller.getModerateJobAdById(999, 'badtoken'),
    ).rejects.toThrow('Job ad with ID 999 not found');
    expect(service.getModerateJobAdById).toHaveBeenCalledWith(999, 'badtoken');
  });

  it('should throw NotFoundException if moderate fails', async () => {
    const notFoundError = new Error('Job ad with ID 999 not found');
    notFoundError.name = 'NotFoundException';
    (service.moderate as jest.Mock).mockRejectedValueOnce(notFoundError);
    await expect(
      controller.moderate(999, 'badtoken', 'Reject'),
    ).rejects.toThrow('Job ad with ID 999 not found');
    expect(service.moderate).toHaveBeenCalledWith(999, 'badtoken', 'Reject');
  });

  it('should handle invalid action in moderate', async () => {
    (service.moderate as jest.Mock).mockRejectedValueOnce(
      new Error('Invalid action'),
    );
    await expect(
      controller.moderate(1, 'token', 'InvalidAction' as any),
    ).rejects.toThrow('Invalid action');
    expect(service.moderate).toHaveBeenCalledWith(1, 'token', 'InvalidAction');
  });
});
