// import { BACKEND_URL } from "../environment/AppEnvironment";

const BACKEND_URL = "http://127.0.0.1:8000/";

export const ApiConstants = {
  getprofile: BACKEND_URL + "users/profile/user_profile/",
  getroles: BACKEND_URL + "users/roles/",
  getauth: BACKEND_URL + "users/login/",
  gettoken: BACKEND_URL + "users/auth/token/refresh/",
  userRegister: BACKEND_URL + "users/register/",
  getjobtags: BACKEND_URL + "company/job-tags/",
  gethiringtags: BACKEND_URL + "company/hiring-tags/",
  addcompany: BACKEND_URL + "company/add/",
  filtercompany: BACKEND_URL + "company/filter-companies/",
  getuserlist: BACKEND_URL + "users/list/",
  getcompanylist: BACKEND_URL + "company/list/",
  getcompanydetails: BACKEND_URL + "company/details/",
  changePassword: BACKEND_URL + "users/changepassword/",
  getcomments: BACKEND_URL + "company/comments/",
  addcomment: BACKEND_URL + "company/comments/add/",
  deletecomment: BACKEND_URL + "company/comments/delete",
  getvarify: BACKEND_URL + "company/status",
  removeblacklist: BACKEND_URL + "company/blacklist/remove",
  addblacklist: BACKEND_URL + "company/blacklist/add",
  downloadcomapnies: BACKEND_URL + "company/download/",
  addbulkstudentcoordinators:
    BACKEND_URL + "users/create-student-coordinators/",
};
