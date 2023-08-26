import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Input,
  InputLeftElement,
  InputGroup,
  Alert,
  AlertIcon,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
  MenuIcon,
  useToast,
} from "@chakra-ui/react";
import DataTable from "../common/table";
import { DownloadIcon, Search2Icon } from "@chakra-ui/icons";
import Filters from "./filters";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCompanyJobTagRequestAction } from "../../redux-store/reducer/slice/company/getJobTagsReducer";
import { getCompanyListRequestAction } from "../../redux-store/reducer/slice/company/listSlice";
import Breadcrumbs from "../common/breadcrumps";
import { getBreadcrumpAddAction } from "../../redux-store/reducer/slice/breadCrumps";
import { getRolesListRequestAction } from "../../redux-store/reducer/slice/rolesReducer";
import { FaFileImport, FaFilter, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdMenu, MdRefresh } from "react-icons/md";
import CompanyDataService from "../../services/company/download";
import FileSaver from "file-saver";
import UploadModal from "../common/importDialog";
import { getCompanyHiringTagRequestAction } from "../../redux-store/reducer/slice/company/getHiringTagsReducer";

const Dashboard = () => {
  const toast = useToast();
  const importBtn = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyJobTagRequestAction(token));
    dispatch(getCompanyHiringTagRequestAction(token));
    dispatch(getCompanyListRequestAction({ token: token, query: "" }));
    dispatch(getBreadcrumpAddAction([{ name: "Company", url: null }]));
    dispatch(getRolesListRequestAction(token));
  }, []);
  const handleCompanyDownload = async () => {
    setLoadingDownload(true);
    try {
      const res = await CompanyDataService.downloadList(token);
      if (res.data) {
        toast({
          title: "Success.",
          description: "Download will be start shortly",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        const fileData = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(fileData, "companies.xlsx");
      } else {
        toast({
          title: "Error.",
          description: "Error downloading file",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        console.log("Error while downloading file");
      }
    } catch (err) {
      toast({
        title: "Error.",
        description: "Error while downloading file",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      console.log(err);
    }
    setLoadingDownload(false);
  };
  return (
    <>
      <Flex
        flexDir={{ base: "column", md: "row", sm: "row" }}
        h={{ base: "auto", md: "90vh", sm: "auto" }}
      >
        <Box
          w={{ base: "100%", md: "100%", sm: "100%" }}
          p={4}
          overflow={"auto"}
        >
          <Flex
            flexDir={"column"}
            px={"3"}
            alignItems={"flex-start"}
            h={"100%"}
          >
            <Breadcrumbs />
            <Box w={"full"} mx={"2"}>
              <Heading as="h2" noOfLines={1} color={"teal.500"}>
                Dashboard
              </Heading>
              <HStack justifyContent={"space-between"}>
                <InputGroup my="3">
                  <InputLeftElement pointerEvents="none">
                    <Search2Icon color="gray.300" />
                  </InputLeftElement>
                  <Input type="text" placeholder="Search Company.." />
                </InputGroup>
                <Button onClick={onOpen}>
                  <FaFilter />
                </Button>
                <Button
                  onClick={() =>
                    dispatch(
                      getCompanyListRequestAction({ token: token, query: "" })
                    )
                  }
                  variant={"solid"}
                  colorScheme="red"
                >
                  <MdRefresh />
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    cursor={"pointer"}
                    minW={0}
                    variant={"solid"}
                    colorScheme={"teal"}
                    size={"sm"}
                    mr={4}
                    p={5}
                  >
                    <MdMenu />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={handleCompanyDownload}>
                      <Box mr={2}>
                        <DownloadIcon />
                      </Box>
                      Download Data
                    </MenuItem>
                    <MenuItem onClick={importBtn.onOpen}>
                      <Box mr={2}>
                        <FaFileImport />
                      </Box>
                      Import Companies
                    </MenuItem>
                    <MenuItem as={Link} to={"/company/add"}>
                      <Box mr={2}>
                        <FaPen />
                      </Box>
                      Add Manually
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
              {loadingDownload && (
                <Alert status="warning" rounded={"md"} mb={"2"}>
                  <AlertIcon />
                  Downloading...
                </Alert>
              )}
              <Alert status="warning" rounded={"md"} mb={"2"}>
                <AlertIcon />
                Some Companies have pending varification
              </Alert>
              <Stack py={"5"}>
                <DataTable />
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Drawer onClose={onClose} isOpen={isOpen} size={"md"} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Stack spacing={6}>
              <Heading as="h4" noOfLines={1} color={"teal.500"}>
                Advance Filters
              </Heading>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <Filters onOpen={onOpen} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <UploadModal
        onClose={importBtn.onClose}
        onFileSubmit={() => {}}
        isOpen={importBtn.isOpen}
        loading={false}
        sampleImage=""
      />
    </>
  );
};

export default Dashboard;
