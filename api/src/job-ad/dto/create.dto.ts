import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class JobDescription {
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  value: string;
}

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

  @ValidateNested({ each: true })
  @Type(() => JobDescription)
  jobDescriptions: JobDescription[];
}
