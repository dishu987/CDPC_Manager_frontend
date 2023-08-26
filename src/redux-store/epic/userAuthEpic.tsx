import { catchError, from, map, mergeMap, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  getUserAuthFailedAction,
  getUserAuthRequestAction,
  getUserAuthSuccessAction,
} from "../reducer/slice/authReducer";
import UserAuthService from "../../services/auth/login";

export const getAuthEpic = (action$: any) => {
  return action$.pipe(
    ofType(getUserAuthRequestAction),
    mergeMap((action: any) =>
      from(UserAuthService.getauth(action.payload)).pipe(
        map((response: any) => {
          if (response.data) {
            return getUserAuthSuccessAction(response.data);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          let result = {
            message: "Email or Password Wrong",
          };
          return of(getUserAuthFailedAction(result));
        })
      )
    )
  );
};
