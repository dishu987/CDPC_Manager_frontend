import { API } from "../api-client";
import { ApiConstants } from "../../utils/apiConstants";

export default class CompanyCommentsService {
  static getComments = (token: string, id: number) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.get(`${ApiConstants.getcomments}?id=${id}`, { headers });
  };
  static addComment = (token: string, data: any) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.post(ApiConstants.addcomment, data, { headers });
  };
  static deleteComment = (token: string, id: number) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    };
    return API.delete(`${ApiConstants.deletecomment}/${id}`, { headers });
  };
}
