import { catchError, from, map, mergeMap, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  getCompanyHiringTagFailedAction,
  getCompanyHiringTagSuccessAction,
  getCompanyHiringTagRequestAction,
} from "../../reducer/slice/company/getHiringTagsReducer";
import CompanyService from "../../../services/company/tags";

export const getCompanyHiringTagsEpic = (action$: any) => {
  return action$.pipe(
    ofType(getCompanyHiringTagRequestAction),
    mergeMap((action: any) =>
      from(CompanyService.getCompanyHiringTags(action.payload)).pipe(
        map((response: any) => {
          if (response.data) {
            return getCompanyHiringTagSuccessAction(response.data);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          let result = {
            message: "Error while getting Tags",
          };
          return of(getCompanyHiringTagFailedAction(result));
        })
      )
    )
  );
};
