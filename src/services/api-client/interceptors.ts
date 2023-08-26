import handleError from "./httpErrorHandler";
import { AppReduxStore } from "../../redux-store";
import { getTokenExpiredAction } from "../../redux-store/reducer/slice/authReducer";

export default function useHttpInterceptors(httpService: any) {
  httpService.interceptors.request.use((request: any) => {
    return request;
  });

  httpService.interceptors.response.use(
    (res: any) => res,
    (error: any) => {
      if (error.response) {
        if (isTokenExpired(error.response)) {
          const refresh = AppReduxStore.getState().getauth.data.token.refresh;
          AppReduxStore.dispatch(getTokenExpiredAction(refresh));
        } else {
          handleError(error.response.status);
        }
      }
      return Promise.reject(error);
    }
  );
}

function isTokenExpired(errorResponse: any) {
  if (
    errorResponse &&
    errorResponse.data &&
    errorResponse.data.errors &&
    errorResponse.data.errors.code === "token_not_valid"
  ) {
    console.log("Function Called!!!");
    const messages = errorResponse.data.errors.messages;
    for (let i = 0; i < messages.length; i++) {
      const tokenType = messages[i].token_type;
      if (tokenType === "access") {
        console.log("Function Called 2!!!");
        return true;
      }
    }
  }
  console.log("Function Called 3!!!");
  return false;
}
