import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class UserRolesService {
  static getroles = (token: String) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(ApiConstants.getroles, { headers });
  };
}
