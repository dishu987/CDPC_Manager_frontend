import {
  getUserAuthExpiredTokenAction,
  getUserAuthLogoutAction,
} from "../../redux-store/reducer/slice/authReducer";
import UserAuthService from "../auth/login";

export const handleTokenExpiration = async (dispatch: any, refresh: any) => {
  try {
    const res = await UserAuthService.getNewToken(refresh);
    if (res.data) {
      dispatch(getUserAuthExpiredTokenAction(res.data.access));
    }
  } catch (err) {
    console.log(err);
    dispatch(getUserAuthLogoutAction());
    window.location.replace("/login");
  }
};
