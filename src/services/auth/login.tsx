import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class UserAuthService {
  static getauth = (data: any) => {
    console.log(data);
    return API.post(ApiConstants.getauth, data);
  };
  static getNewToken = (refresh: string) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    return API.post(ApiConstants.gettoken, { refresh: refresh }, { headers });
  };
}
