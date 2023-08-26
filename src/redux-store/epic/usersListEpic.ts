import { catchError, from, map, mergeMap, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  getUsersListFailedAction,
  getUsersListRequestAction,
  getUsersListSuccessAction,
} from "../reducer/slice/usersList";
import UsersListService from "../../services/profile/getlist";

export const getUsersListEpic = (action$: any) => {
  return action$.pipe(
    ofType(getUsersListRequestAction),
    mergeMap((action: any) =>
      from(UsersListService.usersList(action.payload)).pipe(
        map((response: any) => {
          if (response.data) {
            return getUsersListSuccessAction(response.data);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          let result = {
            message: "Error while getting users",
          };
          return of(getUsersListFailedAction(result));
        })
      )
    )
  );
};
