import { Box, VStack } from "@chakra-ui/react";
import UserProfilePage from "./profileCard";
import Breadcrumbs from "../common/breadcrumps";
import { useDispatch } from "react-redux";
import { getBreadcrumpAddAction } from "../../redux-store/reducer/slice/breadCrumps";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserProfileService from "../../services/profile/getprofile";
import SpinnerFullScreen from "../common/loader";

const user = {
  data: {},
  isLoading: false,
  isSuccessful: true,
  error: {},
};

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string | undefined }>();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useSelector((state: any) => state.getauth.data.token.access);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await UserProfileService.usersProfile(token, id);
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle error state or display a notification
        setLoading(false);
      }
    };
    fetchCompanyDetails();
    dispatch(
      getBreadcrumpAddAction([
        { name: "Users Profile", url: null },
        { name: user?.name, url: null },
      ])
    );
  }, [loading, id]);
  return (
    <VStack alignItems={"center"} pt={5}>
      <Box pl={3} justifyContent={"start"} w={"100%"}>
        <Breadcrumbs />
      </Box>
      <SpinnerFullScreen loading={loading} />
      <UserProfilePage data={user} isLoading={loading} />
    </VStack>
  );
};

export default UserProfile;
