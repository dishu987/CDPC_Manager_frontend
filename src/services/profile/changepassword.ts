import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class ChangePasswordService {
  static userChangePassword = (token: String, data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.post(ApiConstants.changePassword, data, { headers });
  };
}
