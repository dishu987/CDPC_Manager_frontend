export interface UsersInterface {
  id: Number;
  name: String;
  email: String;
  role_group: Number;
  mobile: Number;
  gender: String;
  address: String;
}

export interface UsersListInterface {
  users?: Array<UsersInterface>;
  isLoading: Boolean;
  isSuccessful: Boolean;
  result?: any;
  error?: any;
}
