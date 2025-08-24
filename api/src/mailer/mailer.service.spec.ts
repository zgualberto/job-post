import { MailerService } from './mailer.service';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { JobAd } from '../database/entities/job-ad.entity';

describe('MailerService', () => {
  let service: MailerService;
  let nestMailerService: NestMailerService;

  beforeEach(() => {
    nestMailerService = {
      sendMail: jest.fn().mockResolvedValue(undefined),
    } as any;
    service = new MailerService(nestMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send moderator notification', async () => {
    const jobAd = { id: 1, token: 'abc', name: 'Test Job' } as JobAd;
    const to = ['mod1@example.com', 'mod2@example.com'];
    await service.sendModeratorNotification(to, jobAd);
    expect(nestMailerService.sendMail).toHaveBeenCalledWith({
      to,
      subject: 'New Job Ad Needs Approval',
      html: expect.stringContaining('Test Job'),
    });
  });

  it('should send job ad status notification (Approved)', async () => {
    const jobAd = { name: 'Test Job' } as JobAd;
    await service.sendJobAdStatusNotification(
      'user@example.com',
      jobAd,
      'Approved',
    );
    expect(nestMailerService.sendMail).toHaveBeenCalledWith({
      to: 'user@example.com',
      subject: 'Job Ad "Test Job" Status Update',
      html: expect.stringContaining('approved'),
    });
  });

  it('should send job ad status notification (Rejected)', async () => {
    const jobAd = { name: 'Test Job' } as JobAd;
    await service.sendJobAdStatusNotification(
      'user@example.com',
      jobAd,
      'Rejected',
    );
    expect(nestMailerService.sendMail).toHaveBeenCalledWith({
      to: 'user@example.com',
      subject: 'Job Ad "Test Job" Status Update',
      html: expect.stringContaining('rejected'),
    });
  });

  it('should handle error from sendMail', async () => {
    (nestMailerService.sendMail as jest.Mock).mockRejectedValueOnce(
      new Error('Mail failed'),
    );
    const jobAd = { name: 'Test Job' } as JobAd;
    await expect(
      service.sendJobAdStatusNotification(
        'user@example.com',
        jobAd,
        'Approved',
      ),
    ).rejects.toThrow('Mail failed');
  });
});
