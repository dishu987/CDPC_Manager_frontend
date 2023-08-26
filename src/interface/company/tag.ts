export interface CompanyJobTagInterface {
  id: number;
  name: string;
}

export interface CompanyJobTagsListInterface {
  tags?: Array<CompanyJobTagInterface>;
  isLoading: boolean;
  isSuccessful: boolean;
  result?: any;
  error?: any;
}
export interface CompanyHiringTagInterface {
  id: number;
  name: string;
}

export interface CompanyHiringTagsListInterface {
  tags?: Array<CompanyHiringTagInterface>;
  isLoading: Boolean;
  isSuccessful: Boolean;
  result?: any;
  error?: any;
}
