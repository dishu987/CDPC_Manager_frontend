import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login";
import Dashboard from "./components/dashboard";
import { useSelector } from "react-redux";
import ViewCompany from "./components/dashboard/company/view";
import Navbar from "./components/common/navbar";
import Multistep from "./components/dashboard/company/add";
import RegisterForm from "./components/users/cordinators/add";
import ChangePassword from "./components/users/changepassword";
import StudentCoordinatorList from "./components/users/cordinators";
import UserProfile from "./components/users/profle";
import { useEffect } from "react";
import { handleTokenExpiration } from "./services/api-client/renewtoken";
import { useDispatch } from "react-redux";
import { getTokenExpiredAction } from "./redux-store/reducer/slice/authReducer";

function App() {
  const dispatch = useDispatch();
  const refresh = useSelector((state: any) => state.getauth.data.token.refresh);
  const getuser = useSelector((state: any) => state.getauth);
  useEffect(() => {
    if (getuser.isSuccessful && getuser.isExpired) {
      console.log("Expired Function Called!!");
      dispatch(getTokenExpiredAction(refresh));
      // handleTokenExpiration(dispatch, refresh);
    }
  }, []);
  return (
    <>
      {getuser.isSuccessful && <Navbar />}
      <Routes>
        {!getuser.isSuccessful && (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </>
        )}
        {getuser.isSuccessful && (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/company/:id" element={<ViewCompany />} />
            <Route path="/company/add" element={<Multistep />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/cordinators/add" element={<RegisterForm />} />
            <Route path="/cordinators" element={<StudentCoordinatorList />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
