import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CheckboxIcon,
  FormControl,
  FormLabel,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthRequestAction } from "../../redux-store/reducer/slice/authReducer";

interface UserData {
  email?: string;
  password?: string;
}
const intialState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const toast = useToast();
  const [error, setError] = useState<String>("");
  const [user, setUser] = useState<UserData>(intialState);
  const dispatch = useDispatch();
  const getauth = useSelector((state: any) => state.getauth);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.email === "" || user.password === "") {
      setError("Email or Password are Required");
      toast({
        title: "Error.",
        description: "Email or Password are Required",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    dispatch(getUserAuthRequestAction(user));
    setUser(intialState);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <Box position={"relative"} overflow={"hidden"} height={"100vh"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 5, md: 5 }}>
          <Box>
            <Image
              h={"200px"}
              // ml={"10px"}
              src={"https://www.iitrpr.ac.in/sites/default/files/image.jpg"}
            />
          </Box>
          <Heading
            lineHeight={1.1}
            textAlign={"left"}
            fontSize={{ base: "2xl", sm: "2xl", md: "3xl", lg: "3xl" }}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-r, blue.400,red.400)"
              bgClip="text"
              fontSize={{ base: "3xl", sm: "3xl", md: "5xl", lg: "5xl" }}
            >
              CDPC{" "}
            </Text>
            <br />
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              Company Management Portal
            </Text>
            <br />
            IIT Ropar
          </Heading>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
          boxShadow={"md"}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Login
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={"form"} onSubmit={handleSubmit} noValidate>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="example321@iitrpr.ac.in"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </FormControl>
            </Stack>

            <Button
              type="submit"
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              loadingText={"Please Wait.."}
              isLoading={getauth.isLoading}
            >
              Submit
            </Button>
            {error != "" && (
              <Alert status="error" my={"4"} rounded={"lg"}>
                <CheckboxIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {getauth?.isSuccessful && (
              <Alert status="success" my={"4"} rounded={"lg"}>
                <CheckboxIcon />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Logged In</AlertDescription>
              </Alert>
            )}
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  );
}
