import React, { useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  FormControl,
  FormLabel,
  Stack,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersListRequestAction } from "../../../redux-store/reducer/slice/usersList";
import { UsersInterface } from "../../../interface/redux-state/UsersListInterface";
import Breadcrumbs from "../../common/breadcrumps";
import { getBreadcrumpAddAction } from "../../../redux-store/reducer/slice/breadCrumps";
import { Link } from "react-router-dom";
import { FaFileImport, FaPen } from "react-icons/fa";
import UploadModal from "../../common/importDialog";
import UserRegisterService from "../../../services/auth/addUser";
import xls_img from "./sample_xls.png";
import { canAddUsers } from "../../../utils/permissions";
import SpinnerFullScreen from "../../common/loader";
import { MdRefresh } from "react-icons/md";

const StudentCoordinatorList: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const importBtn = useDisclosure();
  const getauth = useSelector((state: any) => state.getauth);
  const token = getauth?.data?.token?.access;
  const userslist = useSelector((state: any) => state.getuserslist);
  const [searchValue, setSearchValue] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [loading, setLoading] = useState<boolean>(false);
  const canCreateUsers = canAddUsers(getauth?.data.role);
  useEffect(() => {
    dispatch(getBreadcrumpAddAction([{ name: "Cordinators", url: null }]));
    dispatch(getUsersListRequestAction({ token: token, role_group: 10 }));
  }, []);
  const uploadStudentCoordinators = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await UserRegisterService.bulkStudentCoordinators(
        token,
        formData
      );
      toast({
        title: "Success.",
        description: "Added Successfuly",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      console.log(response);
      dispatch(getUsersListRequestAction({ token: token, role_group: 10 }));
    } catch (error) {
      toast({
        title: "Error.",
        description: "Error while adding users",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      console.error(error);
    }
    importBtn.onClose();
    setLoading(false);
  };

  return (
    <>
      <Box mt={3} ml={5}>
        <Breadcrumbs />
      </Box>
      <Box
        maxWidth="100%"
        margin="auto"
        m={8}
        p={4}
        boxShadow="md"
        borderRadius="md"
      >
        <HStack justifyContent={"space-between"}>
          <Heading mb={4}>Student Coordinators</Heading>
          <Box>
            <Button
              onClick={() =>
                dispatch(
                  getUsersListRequestAction({ token: token, role_group: 10 })
                )
              }
              variant={"solid"}
              mr={2}
              colorScheme="gray"
              isLoading={userslist.isLoading}
            >
              <MdRefresh />
            </Button>
            <Button variant={"solid"} colorScheme="teal" mr={2} isDisabled>
              <DownloadIcon />
            </Button>
            {canCreateUsers && (
              <Menu>
                <MenuButton
                  as={Button}
                  cursor={"pointer"}
                  minW={0}
                  variant={"solid"}
                  size={"sm"}
                  mr={4}
                  p={5}
                  colorScheme="teal"
                >
                  <AddIcon mr={2} />
                  Add
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/cordinators/add">
                    <Box mr={2}>
                      <FaPen />
                    </Box>
                    Add Manually
                  </MenuItem>
                  <MenuItem onClick={importBtn.onOpen}>
                    <Box mr={2}>
                      <FaFileImport />
                    </Box>
                    Import From File
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Box>
        </HStack>
        <FormControl mb={4}>
          <FormLabel>Search by Name</FormLabel>
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by name"
          />
        </FormControl>
        <Stack direction="row" spacing={4} mb={4}>
          <FormControl isDisabled>
            <FormLabel>Role Group</FormLabel>
            <Select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            >
              <option value="10" selected>
                Student Coordinator
              </option>

              {/* Add more position options as needed */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              placeholder="All"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              {/* Add more gender options as needed */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Batch</FormLabel>
            <Select
              value={batchFilter}
              onChange={(e) => setBatchFilter(e.target.value)}
              placeholder="All"
            >
              <option value="All">All</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              {/* Add more batch options as needed */}
            </Select>
          </FormControl>
        </Stack>
        <Table variant="simple">
          {userslist.isLoading && "Please Wait.."}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Gender</Th>
              <Th>Mobile</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!userslist.isLoading &&
              userslist.users.map((user: UsersInterface, index: Number) => (
                <Tr key={String(index)}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.address}</Td>
                  <Td>{user.gender}</Td>
                  <Td>{String(user.mobile)}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to="#"
                      variant={"link"}
                      colorScheme="linkedin"
                    >
                      <EditIcon />{" "}
                    </Button>
                    <Button as={Link} to="#" variant={"link"} colorScheme="red">
                      <DeleteIcon />{" "}
                    </Button>
                    <Button
                      as={Link}
                      to={`/profile/${user.id}`}
                      variant={"link"}
                      colorScheme="teal"
                    >
                      <ExternalLinkIcon />{" "}
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <UploadModal
        onClose={importBtn.onClose}
        onFileSubmit={uploadStudentCoordinators}
        isOpen={importBtn.isOpen}
        loading={loading}
        sampleImage={xls_img}
      />
      <SpinnerFullScreen loading={userslist.isLoading} />
    </>
  );
};

export default StudentCoordinatorList;
