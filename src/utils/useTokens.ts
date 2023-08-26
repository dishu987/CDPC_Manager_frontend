import { useSelector, useDispatch } from "react-redux";
import { getTokenExpiredAction } from "../redux-store/reducer/slice/authReducer";

const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const refresh = useSelector((state: any) => state.getauth.data.token.refresh);

  const refreshToken = () => {
    console.log("Inside Util Fn 1");
    dispatch(getTokenExpiredAction(refresh));
    console.log("Inside Util Fn 2");
  };

  return refreshToken;
};

export default useTokenRefresh;
