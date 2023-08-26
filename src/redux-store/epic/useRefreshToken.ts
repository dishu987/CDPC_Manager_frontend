import { catchError, from, map, mergeMap, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  getTokenExpiredAction,
  getUserAuthExpiredTokenAction,
  getUserAuthFailedAction,
} from "../reducer/slice/authReducer";
import UserAuthService from "../../services/auth/login";

export const refreshTokenEpic = (action$: any) => {
  return action$.pipe(
    ofType(getTokenExpiredAction),
    mergeMap((action: any) =>
      from(UserAuthService.getNewToken(action.payload)).pipe(
        map((response: any) => {
          if (response.data) {
            window.location.reload();
            return getUserAuthExpiredTokenAction(response.data?.access);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          alert("Session Expired, Click Ok to login again");
          let result = {
            message: "Token Renew failed!",
          };
          return of(getUserAuthFailedAction(result));
        })
      )
    )
  );
};
