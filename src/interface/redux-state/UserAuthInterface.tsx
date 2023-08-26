export interface UserAuthInterface {
  data: {
    name: string;
    email: string;
    role: string;
    token: {
      refresh: string;
      access: string;
    };
    msg?: string | null;
  };
  isLoading: false;
  isSuccessful: false;
  isExpired: false;
  error: {};
}
