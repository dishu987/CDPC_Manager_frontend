export interface UserProfileStateInterface {
  data: {
    profile: {
      id: number;
      name: string;
      email: string;
      last_login: string;
      is_superuser: string;
      mobile: string;
      gender: string;
      address: string;
    };
    role?: string | null;
  };
  isLoading: false;
  isSuccessful: false;
  error: {};
}
