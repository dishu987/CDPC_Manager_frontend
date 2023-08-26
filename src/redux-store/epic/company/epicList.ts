import { catchError, from, map, mergeMap, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  getCompanyListFailedAction,
  getCompanyListRequestAction,
  getCompanyListSuccessAction,
} from "../../reducer/slice/company/listSlice";
import CompanyService from "../../../services/company/tags";

export const getCompanyListEpic = (action$: any) => {
  return action$.pipe(
    ofType(getCompanyListRequestAction),
    mergeMap((action: any) =>
      from(CompanyService.getCompanyFilters(action.payload)).pipe(
        map((response: any) => {
          if (response.data) {
            return getCompanyListSuccessAction(response.data);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          let result = {
            message: "Error while getting Companies Data",
          };
          return of(getCompanyListFailedAction(result));
        })
      )
    )
  );
};
