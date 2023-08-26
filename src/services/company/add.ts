import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class CompanyRegisterService {
  static companyRegister = (token: string, data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.post(ApiConstants.addcompany, data, { headers });
  };
  static companyVarify = (token: string, pk: string | undefined) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.put(`${ApiConstants.getvarify}/${pk}`, {}, { headers });
  };
  static companyRemoveBlacklist = (token: string, pk: string | undefined) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.put(`${ApiConstants.removeblacklist}/${pk}`, {}, { headers });
  };
  static companyAddBlacklist = (token: string, pk: string | undefined) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.put(`${ApiConstants.addblacklist}/${pk}`, {}, { headers });
  };
}
