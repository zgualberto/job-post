import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { JobAd } from 'database/entities/job-ad.entity';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendModeratorNotification(to: string[], jobAd: JobAd) {
    const link = `http://localhost:9000/#/moderate/${jobAd.id}?token=${jobAd.token}`;
    await this.mailerService.sendMail({
      to,
      subject: 'New Job Ad Needs Approval',
      html: `A new job ad "${jobAd.name}" needs your approval. Please go to this <a href="${link}">link</a>`,
    });
  }
}
