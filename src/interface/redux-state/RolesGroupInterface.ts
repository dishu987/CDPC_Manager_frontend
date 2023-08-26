export interface RoleGroupInterface {
  id: Number;
  role: String;
}

export interface RoleGroupListInterface {
  roles?: Array<RoleGroupInterface>;
  isLoading: Boolean;
  isSuccessful: Boolean;
  result?: any;
  error?: any;
}
