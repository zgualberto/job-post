import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { JobAd } from '../database/entities/job-ad.entity';
import { JobAdXmlRoot } from 'interfaces/mrge-group-gmbh-job-ad-xml.interface';
import { Repository } from 'typeorm';
import * as xml2js from 'xml2js';

@Injectable()
export class MRGEGroupGMBHJobAdFetchService {
  constructor(
    @InjectRepository(JobAd)
    private readonly jobAdRepository: Repository<JobAd>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async fetchJobAds() {
    console.log('Fetching job ads...');
    // Logic to fetch job ads from external XML
    const response = await axios.get(
      'https://mrge-group-gmbh.jobs.personio.de/xml',
      { responseType: 'text' },
    );
    try {
      const parsedData = (await xml2js.parseStringPromise(response.data, {
        explicitArray: false,
      })) as JobAdXmlRoot;

      // Get root string and assign this as external_name
      const externalName = Object.keys(parsedData)[0];

      const jobAds = parsedData[externalName].position;
      for (const ad of jobAds) {
        const existingAd = await this.jobAdRepository.findOne({
          where: { external_id: ad.id, external_name: externalName },
        });
        if (existingAd) {
          await this.jobAdRepository.save({
            ...existingAd,
            name: ad.name,
            office: ad.office,
            is_external: true,
            external_name: externalName,
            external_id: ad.id,
            metadata: JSON.stringify(ad),
            job_ad_action_id: 1,
          });
        } else {
          await this.jobAdRepository.save({
            name: ad.name,
            office: ad.office,
            is_external: true,
            external_name: externalName,
            external_id: ad.id,
            metadata: JSON.stringify(ad),
            job_ad_action_id: 1,
          });
        }
      }
      console.log(`Fetched and processed ${jobAds.length} job ads.`);
    } catch (error) {
      console.error('Error parsing XML:', error);
    }
  }
}
