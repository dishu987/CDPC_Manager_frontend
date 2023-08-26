import { UserAuthSlice } from "./slice/authReducer";
import { combineReducers } from "redux";
import { BreadcrumpSlice } from "./slice/breadCrumps";
import CompanyListSlice from "./slice/company/listSlice";
import RolesListSlice from "./slice/rolesReducer";
import UsersListSlice from "./slice/usersList";
import CompanyJobTagListSlice from "./slice/company/getJobTagsReducer";
import CompanyHiringTagListSlice from "./slice/company/getHiringTagsReducer";

const rootReducer = combineReducers({
  getauth: UserAuthSlice.reducer,
  getbreadcrumps: BreadcrumpSlice.reducer,
  getcompanyjobtags: CompanyJobTagListSlice.reducer,
  getcompanyhiringtags: CompanyHiringTagListSlice.reducer,
  getcompanylist: CompanyListSlice.reducer,
  getroles: RolesListSlice.reducer,
  getuserslist: UsersListSlice.reducer,
});

export default rootReducer;
