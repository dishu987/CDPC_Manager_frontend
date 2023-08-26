import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class CompanyDataService {
  static downloadList = (token: string) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };

    return API.get(ApiConstants.downloadcomapnies, {
      headers,
      responseType: "arraybuffer",
    });
  };
}
