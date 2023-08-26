import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class UserProfileService {
  static usersProfile = (token: string, role_group: string | undefined) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(`${ApiConstants.getprofile}?userid=${role_group}`, {
      headers,
    });
  };
}
