import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateJobAdDto } from './create.dto';

describe('CreateJobAdDto', () => {
  it('should validate a correct DTO', async () => {
    const dto = {
      name: 'Software Engineer',
      office: 'Berlin',
      email: 'test@example.com',
      yearsOfExperience: '5',
      jobDescriptions: [
        { name: 'Skill', value: 'TypeScript' },
        { name: 'Responsibility', value: 'Develop features' },
      ],
    };
    const instance = plainToInstance(CreateJobAdDto, dto);
    const errors = await validate(instance);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if required fields are missing', async () => {
    const dto = {
      office: '',
      email: '',
      yearsOfExperience: '',
      jobDescriptions: [],
    };
    const instance = plainToInstance(CreateJobAdDto, dto);
    const errors = await validate(instance);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation if jobDescriptions is not an array of objects', async () => {
    const dto = {
      name: 'Software Engineer',
      office: 'Berlin',
      email: 'test@example.com',
      yearsOfExperience: '5',
      jobDescriptions: ['not-an-object'],
    };
    const instance = plainToInstance(CreateJobAdDto, dto);
    const errors = await validate(instance);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation if jobDescriptions items are missing fields', async () => {
    const dto = {
      name: 'Software Engineer',
      office: 'Berlin',
      email: 'test@example.com',
      yearsOfExperience: '5',
      jobDescriptions: [{ name: '', value: '' }],
    };
    const instance = plainToInstance(CreateJobAdDto, dto);
    const errors = await validate(instance);
    expect(errors.length).toBeGreaterThan(0);
  });
});
it('should fail validation if fields are null', async () => {
  const dto = {
    name: null,
    office: null,
    email: null,
    yearsOfExperience: null,
    jobDescriptions: null,
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  expect(errors.length).toBeGreaterThan(0);
});

it('should fail validation if fields are undefined', async () => {
  const dto = {
    // all fields undefined
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  expect(errors.length).toBeGreaterThan(0);
});

it('should fail validation if email is not a string', async () => {
  const dto = {
    name: 'Software Engineer',
    office: 'Berlin',
    email: 12345,
    yearsOfExperience: '5',
    jobDescriptions: [{ name: 'Skill', value: 'TypeScript' }],
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  expect(errors.length).toBeGreaterThan(0);
});

it('should fail validation if yearsOfExperience is not a string', async () => {
  const dto = {
    name: 'Software Engineer',
    office: 'Berlin',
    email: 'test@example.com',
    yearsOfExperience: 5,
    jobDescriptions: [{ name: 'Skill', value: 'TypeScript' }],
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  expect(errors.length).toBeGreaterThan(0);
});

it('should fail validation if jobDescriptions is not an array', async () => {
  const dto = {
    name: 'Software Engineer',
    office: 'Berlin',
    email: 'test@example.com',
    yearsOfExperience: '5',
    jobDescriptions: {},
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  expect(errors.length).toBeGreaterThan(0);
});

it('should fail validation if jobDescriptions contains null or undefined items', async () => {
  const dto = {
    name: 'Software Engineer',
    office: 'Berlin',
    email: 'test@example.com',
    yearsOfExperience: '5',
    jobDescriptions: [null, undefined],
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  expect(errors.length).toBeGreaterThan(0);
});

it('should fail validation if jobDescriptions items are not objects', async () => {
  const dto = {
    name: 'Software Engineer',
    office: 'Berlin',
    email: 'test@example.com',
    yearsOfExperience: '5',
    jobDescriptions: [123, 'string'],
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  expect(errors.length).toBeGreaterThan(0);
});

it('should fail validation if email is not a valid email format (edge case)', async () => {
  const dto = {
    name: 'Software Engineer',
    office: 'Berlin',
    email: 'not-an-email',
    yearsOfExperience: '5',
    jobDescriptions: [{ name: 'Skill', value: 'TypeScript' }],
  };
  const instance = plainToInstance(CreateJobAdDto, dto);
  const errors = await validate(instance);
  // Note: Only fails if you add IsEmail() decorator in DTO
  expect(errors.length).toBeGreaterThan(0);
});
