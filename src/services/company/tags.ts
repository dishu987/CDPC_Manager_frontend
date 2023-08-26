import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class CompanyService {
  static getCompanyJobTags = (token: String) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(ApiConstants.getjobtags, { headers });
  };
  static getCompanyHiringTags = (token: String) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(ApiConstants.gethiringtags, { headers });
  };
  static getCompanyList = (token: String) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(ApiConstants.getcompanylist, { headers });
  };
  static getCompanyFilters = (data: any) => {
    const { token, query } = data;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(`${ApiConstants.filtercompany}?${query}`, { headers });
  };
  static getCompanyDetails = (token: String, id: String | undefined) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(`${ApiConstants.getcompanydetails}?id=${id}`, { headers });
  };
}
