import { Test, TestingModule } from '@nestjs/testing';
import { MRGEGroupGMBHJobAdFetchService } from './mrge-group-gmbh-job-ad-fetch.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JobAd } from '../database/entities/job-ad.entity';
import axios from 'axios';
import * as xml2js from 'xml2js';

jest.mock('axios');
jest.mock('xml2js');

describe('MRGEGroupGMBHJobAdFetchService', () => {
  let service: MRGEGroupGMBHJobAdFetchService;
  let jobAdRepository: any;

  beforeEach(async () => {
    jobAdRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MRGEGroupGMBHJobAdFetchService,
        {
          provide: getRepositoryToken(JobAd),
          useValue: jobAdRepository,
        },
      ],
    }).compile();
    service = module.get<MRGEGroupGMBHJobAdFetchService>(
      MRGEGroupGMBHJobAdFetchService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and process job ads', async () => {
    const mockXml =
      '<root><position><id>1</id><name>Dev</name><office>Berlin</office></position></root>';
    (axios.get as jest.Mock).mockResolvedValue({ data: mockXml });
    (xml2js.parseStringPromise as jest.Mock).mockResolvedValue({
      root: {
        position: [
          { id: '1', name: 'Dev', office: 'Berlin' },
          { id: '2', name: 'QA', office: 'Munich' },
        ],
      },
    });
    jobAdRepository.findOne.mockResolvedValue(null);
    jobAdRepository.save.mockResolvedValue({});

    await service.fetchJobAds();

    expect(axios.get).toHaveBeenCalledWith(
      'https://mrge-group-gmbh.jobs.personio.de/xml',
      { responseType: 'text' },
    );
    expect(xml2js.parseStringPromise).toHaveBeenCalledWith(mockXml, {
      explicitArray: false,
    });
    expect(jobAdRepository.save).toHaveBeenCalledTimes(2);
  });

  it('should update existing job ad if found', async () => {
    const mockXml =
      '<root><position><id>1</id><name>Dev</name><office>Berlin</office></position></root>';
    (axios.get as jest.Mock).mockResolvedValue({ data: mockXml });
    (xml2js.parseStringPromise as jest.Mock).mockResolvedValue({
      root: {
        position: [{ id: '1', name: 'Dev', office: 'Berlin' }],
      },
    });
    jobAdRepository.findOne.mockResolvedValue({
      id: 1,
      name: 'Old',
      office: 'Old',
      external_id: '1',
      external_name: 'root',
    });
    jobAdRepository.save.mockResolvedValue({});

    await service.fetchJobAds();

    expect(jobAdRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Dev',
        office: 'Berlin',
        external_id: '1',
        external_name: 'root',
      }),
    );
  });

  it('should handle XML parse errors gracefully', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: '<invalid>' });
    (xml2js.parseStringPromise as jest.Mock).mockRejectedValue(
      new Error('Parse error'),
    );
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    await service.fetchJobAds();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error parsing XML:',
      expect.any(Error),
    );
    consoleErrorSpy.mockRestore();
  });
});
