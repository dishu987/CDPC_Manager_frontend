import { catchError, from, map, mergeMap, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  getRolesListFailedAction,
  getRolesListRequestAction,
  getRolesListSuccessAction,
} from "../reducer/slice/rolesReducer";
import UserRolesService from "../../services/auth/getroles";

export const getRolesEpic = (action$: any) => {
  return action$.pipe(
    ofType(getRolesListRequestAction),
    mergeMap((action: any) =>
      from(UserRolesService.getroles(action.payload)).pipe(
        map((response: any) => {
          if (response.data) {
            return getRolesListSuccessAction(response.data);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          let result = {
            message: "Error while getting Roles",
          };
          return of(getRolesListFailedAction(result));
        })
      )
    )
  );
};
