import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  VStack,
  Container,
  Center,
  Text,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import UserRegisterService from "../../../services/auth/addUser";
import Breadcrumbs from "../../common/breadcrumps";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBreadcrumpAddAction } from "../../../redux-store/reducer/slice/breadCrumps";

interface FormData {
  email: string;
  name: string;
  mobile: string;
  gender: string;
  address: string;
  password: string;
  password2: string;
  role_group: String;
}

const RegisterForm: React.FC = () => {
  const toast = useToast();
  const roles_groups = useSelector((state: any) => state.getroles);
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const [formData, setFormData] = useState<FormData>({
    role_group:
      roles_groups.roles.find(
        (role: any) => role.role === "Student Coordinator"
      )?.id || "",
    email: "",
    name: "",
    mobile: "",
    gender: "",
    address: "",
    password: "1234",
    password2: "1234",
  });
  const [useCustomPassword, setUseCustomPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBreadcrumpAddAction([
        { name: "Coordinators", url: "/cordinators" },
        { name: "Register", url: null },
      ])
    );
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await UserRegisterService.userRegister(token, formData);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setError(false);
    } catch (err) {
      toast({
        title: "Error.",
        description: "User already existed or Wrong Field Given.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setError(true);
    }
    setLoading(false);
    console.log(formData);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleTogglePassword = () => {
    setUseCustomPassword(!useCustomPassword);
  };

  return (
    <Box minHeight="100vh" pb={"50px"}>
      <Box mt={3} ml={5}>
        <Breadcrumbs />
      </Box>
      <Container>
        <Center pt={8}>
          <Box
            width="100%"
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
          >
            <Text
              mb={4}
              fontSize={"3xl"}
              fontWeight={"bold"}
              textColor={"blue.400"}
              textAlign={"center"}
            >
              User Registration
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Role Group</FormLabel>
                  <Select
                    name="role_group"
                    onChange={handleChange}
                    placeholder="Select role group"
                    disabled
                  >
                    {roles_groups.isLoading && <option>Loading..</option>}
                    {!roles_groups.isLoading &&
                      roles_groups.isSuccessful &&
                      roles_groups.roles.map((role: any, index: any) => {
                        return (
                          <option
                            value={role.id}
                            key={index}
                            selected={
                              role.role === "Student Coordinator" ? true : false
                            }
                          >
                            {" "}
                            {role.role}
                          </option>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl isInvalid={error}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isInvalid={error}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isInvalid={error}>
                  <FormLabel>Mobile</FormLabel>
                  <Input
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl isInvalid={error}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Select gender"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHERS">Other</option>
                  </Select>
                </FormControl>
                <FormControl isInvalid={error}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormControl>
                <Checkbox
                  isChecked={useCustomPassword}
                  onChange={handleTogglePassword}
                  colorScheme="blue"
                >
                  Set custom password
                </Checkbox>
                {!useCustomPassword && (
                  <Box
                    fontSize={"small"}
                    textColor={"gray.500"}
                    mt={"-2"}
                    fontStyle={"italic"}
                  >
                    Default password(1234) will be set for the user.
                  </Box>
                )}
                {useCustomPassword && (
                  <>
                    <FormControl>
                      <FormLabel>Password</FormLabel>
                      <Input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={formData.password2}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </>
                )}

                <Button
                  type="submit"
                  variant={"solid"}
                  colorScheme="red"
                  isLoading={loading}
                  loadingText="Please Wait.."
                >
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </Center>
      </Container>
    </Box>
  );
};

export default RegisterForm;
