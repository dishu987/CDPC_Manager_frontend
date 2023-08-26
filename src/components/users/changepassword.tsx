import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  HStack,
  FormErrorMessage,
  FormErrorIcon,
} from "@chakra-ui/react";
import Breadcrumbs from "../common/breadcrumps";
import { useDispatch } from "react-redux";
import { getBreadcrumpAddAction } from "../../redux-store/reducer/slice/breadCrumps";
import ChangePasswordService from "../../services/profile/changepassword";
import { useSelector } from "react-redux";

const ChangePassword: React.FC = () => {
  const toast = useToast();
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBreadcrumpAddAction([
        { name: "User", url: "/" },
        { name: "Change Password", url: null },
      ])
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    if (
      newPassword != confirmPassword ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      toast({
        title: "Error.",
        description: "Invalid Input Fields.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setError(true);
      setLoading(false);
    } else {
      try {
        await ChangePasswordService.userChangePassword(token, {
          password: newPassword,
          password2: confirmPassword,
        });
        toast({
          title: "Success.",
          description: "Password has been Changed.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } catch (err) {
        toast({
          title: "Error.",
          description: "Invalid Credentials.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setError(true);
      }
    }
    setLoading(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <VStack w={"100%"} alignItems={"flex-start"}>
      <Box mt={4} p={5}>
        <Breadcrumbs />
      </Box>
      <Box
        maxWidth="600px"
        margin="auto"
        mt={8}
        p={4}
        boxShadow="md"
        borderRadius="md"
      >
        <Heading mb={4}>Change Password</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="new-password" mb={4} isInvalid={error}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <FormErrorMessage>
              {" "}
              <FormErrorIcon />
              This field is required
            </FormErrorMessage>
          </FormControl>
          <FormControl id="confirm-password" mb={4} isInvalid={error}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <FormErrorMessage>
              {" "}
              <FormErrorIcon />
              This field is required
            </FormErrorMessage>
          </FormControl>
          <HStack justifyContent={"end"}>
            <Button
              type="submit"
              variant={"solid"}
              colorScheme="red"
              isLoading={loading}
              loadingText={"Please Wait.."}
              alignSelf={"flex-end"}
            >
              Change Password
            </Button>
          </HStack>
        </form>
      </Box>
    </VStack>
  );
};

export default ChangePassword;
