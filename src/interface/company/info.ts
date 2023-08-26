export interface CompanyInterface {
  id?: number;
  name: string;
  about: string;
  spoc: {
    id?: number;
    name: string;
    email: string;
  };
  job_location: string;
  salary: number | string;
  years_of_collaboration: number;
  importance: number;
  assigned_coordinators: { id?: number; name: string; email: string }[];
  hr_details: {
    name?: string;
    email?: string;
    phone?: string;
  }[];
  status?: Boolean;
  blacklist?: Boolean;
  job_tags: { name?: string }[];
  hiring_tags: { name?: string }[];
  additional_info?: string | null;
}

export interface CompanyListInterface {
  companies?: {
    id: number;
    name: string;
    salary: number;
    job_tags: number[];
    hiring_tags: number[];
    importance: number;
    years_of_collaboration: number;
    blacklist: Boolean;
    status: Boolean;
  }[];
  isLoading: Boolean;
  isSuccessful: Boolean;
  result?: any;
  error?: any;
}
