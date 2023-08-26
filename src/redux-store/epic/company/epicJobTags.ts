import { catchError, from, map, mergeMap, of } from "rxjs";
import { ofType } from "redux-observable";
import {
  getCompanyJobTagFailedAction,
  getCompanyJobTagSuccessAction,
  getCompanyJobTagRequestAction,
} from "../../reducer/slice/company/getJobTagsReducer";
import CompanyService from "../../../services/company/tags";

export const getCompanyJobTagsEpic = (action$: any) => {
  return action$.pipe(
    ofType(getCompanyJobTagRequestAction),
    mergeMap((action: any) =>
      from(CompanyService.getCompanyJobTags(action.payload)).pipe(
        map((response: any) => {
          if (response.data) {
            return getCompanyJobTagSuccessAction(response.data);
          } else {
            throw response;
          }
        }),
        catchError((err) => {
          let result = {
            message: "Error while getting Tags",
          };
          return of(getCompanyJobTagFailedAction(result));
        })
      )
    )
  );
};
