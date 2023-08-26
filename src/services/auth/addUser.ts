import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class UserRegisterService {
  static userRegister = (token: String, data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.post(ApiConstants.userRegister, data, { headers });
  };
  static bulkStudentCoordinators = (token: String, formData: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
      "Content-Type": "multipart/form-data",
    };
    return API.post(ApiConstants.addbulkstudentcoordinators, formData, {
      headers,
    });
  };
}
