import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class UsersListService {
  static usersList = (data: any) => {
    const headers = {
      Authorization: `Bearer ${data.token}`,
      Accept: "*/*",
    };
    return API.get(
      `${ApiConstants.getuserlist}?role_group=${data.role_group}`,
      {
        headers,
      }
    );
  };
}
