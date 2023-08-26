import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Icon,
  Text,
  Badge,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ArrowForwardIcon,
  LockIcon,
} from "@chakra-ui/icons";
import { getUserAuthLogoutAction } from "../../redux-store/reducer/slice/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link as Link1 } from "react-router-dom";
import NotificationPanel from "./notifications";
import { Notification } from "../../interface/data/notificationInterface";
import { MdNotifications } from "react-icons/md";
import { Links } from "../../utils/navlinks";
import { FaUser } from "react-icons/fa";

const NavLink = ({
  children,
}: {
  children: { label: ReactNode; link: string };
}) => (
  <Link
    px={2}
    py={1}
    as={Link1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={children.link}
  >
    {children.label}
  </Link>
);
const notifications: Notification[] = [
  {
    id: 1,
    title: "New Message",
    message: "You have received a new message from John Doe.",
    timestamp: new Date("2023-06-27T09:30:00Z"),
    isRead: false,
  },
  {
    id: 2,
    title: "Reminder",
    message: "Your appointment is scheduled for tomorrow at 2 PM.",
    timestamp: new Date("2023-06-26T14:15:00Z"),
    isRead: true,
  },
  {
    id: 3,
    title: "Payment Received",
    message: "Congratulations! You have received a payment of $100.",
    timestamp: new Date("2023-06-25T18:45:00Z"),
    isRead: false,
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const getauth = useSelector((state: any) => state.getauth);
  const handleLogout = () => {
    window.location.replace("/login");
    dispatch(getUserAuthLogoutAction());
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link1} to="/">
              <Image
                h={"50px"}
                ml={"10px"}
                src={"https://www.iitrpr.ac.in/sites/default/files/image.jpg"}
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} children={link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                cursor={"pointer"}
                minW={0}
                variant={"link"}
                colorScheme={"teal"}
                size={"lg"}
                mr={4}
                rightIcon={
                  <Badge
                    ml="-3"
                    mt={-5}
                    p={"auto"}
                    colorScheme="red"
                    rounded={"full"}
                    variant={"solid"}
                  >
                    20
                  </Badge>
                }
              >
                <MdNotifications />
              </MenuButton>
              <MenuList>
                <NotificationPanel notifications={notifications} />
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar icon={<FaUser />} size={"sm"} />
              </MenuButton>
              <MenuList>
                <Flex>
                  <Box ml={2} p={2}>
                    {!getauth?.isLoading && getauth?.isSuccessful && (
                      <>
                        <Text fontWeight="bold">
                          {getauth?.data.name}
                          <Badge ml="1" colorScheme="green">
                            {getauth?.data.role}
                          </Badge>
                        </Text>
                        <Text fontSize="sm"> {getauth?.data.email}</Text>
                      </>
                    )}
                  </Box>
                </Flex>
                <MenuDivider />
                <MenuItem as={Link1} to={"/profile/my"}>
                  <Icon ml={"-0.1"} mr={"2"}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24"
                    >
                      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                    </svg>
                  </Icon>
                  Profile
                </MenuItem>
                <MenuItem as={Link1} to="/changepassword">
                  <LockIcon mr={"2"} />
                  Change Password
                </MenuItem>
                <MenuDivider />
                <MenuItem as={"button"} onClick={handleLogout}>
                  Logout <ArrowForwardIcon ml={"2"} />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} children={link} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
