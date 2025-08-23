export interface JobDescription {
  name: string;
  value: string;
}

export interface JobDescriptions {
  jobDescription: JobDescription[];
}

export interface AdditionalOffices {
  office: string;
}

export interface Position {
  id: string;
  subcompany: string;
  office: string;
  additionalOffices: AdditionalOffices;
  department: string;
  recruitingCategory: string;
  name: string;
  jobDescriptions: JobDescriptions;
  employmentType: string;
  seniority: string;
  schedule: string;
  yearsOfExperience: string;
  keywords?: string;
  occupation: string;
  occupationCategory: string;
  createdAt: string;
}

export interface JobAdGroup {
  position: Position[];
}

export interface JobAdXmlRoot {
  [key: string]: JobAdGroup;
}
