import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobDescription } from 'interfaces/mrge-group-gmbh-job-ad-xml.interface';

export class CreateJobAdDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  office: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  yearsOfExperience: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  jobDescription: JobDescription[];
}
