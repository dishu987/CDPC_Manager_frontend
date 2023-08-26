import { combineEpics } from "redux-observable";
import { getAuthEpic } from "./userAuthEpic";
import { getCompanyListEpic } from "./company/epicList";
import { getRolesEpic } from "./rolesEpic";
import { getUsersListEpic } from "./usersListEpic";
import { getCompanyJobTagsEpic } from "./company/epicJobTags";
import { getCompanyHiringTagsEpic } from "./company/epicHiringTags";
import { refreshTokenEpic } from "./useRefreshToken";

export const rootEpic = combineEpics(
  getAuthEpic,
  getCompanyJobTagsEpic,
  getCompanyHiringTagsEpic,
  getCompanyListEpic,
  getRolesEpic,
  getUsersListEpic,
  refreshTokenEpic
);
