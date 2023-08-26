import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  HStack,
  Skeleton,
  SkeletonText,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Alert,
  AlertIcon,
  useDisclosure,
  Tag,
  TagLeftIcon,
} from "@chakra-ui/react";
import {
  MdBlock,
  MdBlockFlipped,
  MdChangeCircle,
  MdLocationPin,
} from "react-icons/md";
import CommentSection from "./comment";
import { CompanyInterface } from "../../../interface/company/info";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CompanyService from "../../../services/company/tags";
import { useSelector } from "react-redux";
import { AddIcon, CheckCircleIcon, EditIcon } from "@chakra-ui/icons";
import Breadcrumbs from "../../common/breadcrumps";
import VarifyCompanyAlert from "../../common/alerts/varifyCompany";
import BlacklistRemoveCompanyAlert from "../../common/alerts/blacklistCompany";
import BlacklistAddCompanyAlert from "../../common/alerts/addblacklistCompany";
import { FaTrash } from "react-icons/fa";

export default function ViewCompany() {
  const { id } = useParams<{ id: string | undefined }>();
  const [company, setCompany] = useState<CompanyInterface | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const varifyBtn = useDisclosure();
  const blacklistBtn = useDisclosure();
  const addblacklistBtn = useDisclosure();
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await CompanyService.getCompanyDetails(token, id); // Replace with your API endpoint
        setCompany(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching company details:", error);
        // Handle error state or display a notification
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  }, [id]);
  return (
    <Container maxW={"7xl"}>
      <VarifyCompanyAlert
        onClose={varifyBtn.onClose}
        isOpen={varifyBtn.isOpen}
        pk={id}
      />
      <BlacklistRemoveCompanyAlert
        onClose={blacklistBtn.onClose}
        isOpen={blacklistBtn.isOpen}
        pk={id}
      />
      <SimpleGrid
        columns={{ base: 1, lg: 1 }}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 10, md: 10 }}
      >
        <Breadcrumbs />
        {company?.blacklist && (
          <Alert status="error" rounded={"md"} p={5}>
            <AlertIcon />
            Due to valid reasons, company has been blocked. if this is
            mistake,then{" "}
            <Button
              mx={2}
              colorScheme="red"
              variant={"link"}
              onClick={blacklistBtn.onOpen}
            >
              Click here
            </Button>{" "}
            for unblock.
          </Alert>
        )}
        {!company?.status && (
          <Alert status="warning" rounded={"md"} p={5}>
            <AlertIcon />
            Company is not varified yet,{" "}
            <Button
              mx={2}
              onClick={varifyBtn.onOpen}
              colorScheme="red"
              variant={"link"}
            >
              Click here
            </Button>{" "}
            for varification.
          </Alert>
        )}
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Skeleton isLoaded={!loading}>
              <HStack justifyContent={"space-between"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  textColor={"blue.600"}
                >
                  {company?.name}
                </Heading>{" "}
                <Box
                  fontSize={"md"}
                  textColor={"gray.50"}
                  fontWeight={"bold"}
                  display={"flex"}
                  alignItems={"center"}
                  bg={company?.status ? "green.500" : "orange.500"}
                  p={2}
                  rounded={"md"}
                >
                  {company?.status && (
                    <>
                      <Text mr={2}>Varified</Text>
                      <CheckCircleIcon />
                    </>
                  )}
                  {!company?.status && (
                    <>
                      <Text mr={2}>Pending Varification</Text>
                      <MdBlock />
                    </>
                  )}
                </Box>
              </HStack>
            </Skeleton>
            <HStack mt={4}>
              <Text fontWeight={300} fontSize={"2xl"}>
                <MdLocationPin />
              </Text>
              <Skeleton isLoaded={!loading}>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  Location: {company?.job_location}
                </Text>
              </Skeleton>
            </HStack>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              {/* <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"2xl"}
                fontWeight={"300"}
                textAlign="left"
              >
                About
              </Text> */}
              <Text fontSize={"lg"}>
                <SkeletonText
                  isLoaded={!loading}
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="7"
                >
                  {company?.about}
                </SkeletonText>
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Job tags
              </Text>

              <List spacing={2}>
                <Skeleton isLoaded={!loading}>
                  <HStack spacing={4}>
                    {company?.job_tags.map((tag, index) => {
                      return (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {tag?.name}
                        </Tag>
                      );
                    })}
                    <Tag
                      size={"lg"}
                      cursor={"pointer"}
                      variant="subtle"
                      colorScheme="teal"
                    >
                      <TagLeftIcon boxSize="12px" as={AddIcon} />
                      Add Tag
                    </Tag>
                  </HStack>
                </Skeleton>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Hiring tags
              </Text>

              <List spacing={2}>
                <Skeleton isLoaded={!loading}>
                  <HStack spacing={4}>
                    {company?.hiring_tags.map((tag, index) => {
                      return (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {tag?.name}
                        </Tag>
                      );
                    })}
                    <Tag
                      size={"lg"}
                      cursor={"pointer"}
                      variant="subtle"
                      colorScheme="teal"
                    >
                      <TagLeftIcon boxSize="12px" as={AddIcon} />
                      Add Tag
                    </Tag>
                  </HStack>
                </Skeleton>
              </List>
            </Box>
            <HStack
              w={"100%"}
              justify={"space-between"}
              my={2}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Years of collaboration
              </Text>
              <Skeleton isLoaded={!loading}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("gray.600", "gray.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  {company?.years_of_collaboration} Years
                </Text>{" "}
              </Skeleton>
            </HStack>
            <HStack
              w={"100%"}
              justify={"space-between"}
              my={2}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Salary
              </Text>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("gray.600", "gray.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                {" "}
                <Skeleton isLoaded={!loading}>
                  {company?.salary} Lac/Annum
                </Skeleton>
              </Text>
            </HStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                SPOC
              </Text>
              <Flex gap={3} mt={6} flexWrap={"wrap"}>
                <Box
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  boxShadow="md"
                  mb={4}
                  w={"fit-content"}
                  transition={"1s ease all"}
                >
                  <Text fontSize="lg" color={"teal.500"} fontWeight="bold">
                    {company?.spoc?.name}
                  </Text>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Email: {company?.spoc?.email}
                  </Text>
                  <Button
                    colorScheme="teal"
                    variant={"solid"}
                    size="sm"
                    mt={4}
                    as={Link}
                    to={`/profile/${company?.spoc?.id}`}
                  >
                    Contact
                  </Button>
                  <Button
                    colorScheme="red"
                    variant={"ghost"}
                    size="sm"
                    mt={4}
                    ml={1}
                  >
                    <FaTrash />
                  </Button>
                </Box>
                <Box
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  mb={4}
                  w={"150px"}
                  _hover={{
                    bg: "teal.50",
                    scale: "1.2",
                  }}
                  transition={"1s ease all"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  cursor={"pointer"}
                >
                  <EditIcon />
                </Box>
              </Flex>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Student Cordinators
              </Text>
              <SkeletonText
                isLoaded={!loading}
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
                w={"fit-content"}
              >
                <Flex gap={3} mt={6} flexWrap={"wrap"}>
                  {company?.assigned_coordinators.map((coordinators, index) => {
                    return (
                      <Box
                        key={index}
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="md"
                        mb={4}
                        w={"fit-content"}
                        transition={"1s ease all"}
                      >
                        <Text
                          fontSize="lg"
                          color={"teal.500"}
                          fontWeight="bold"
                        >
                          {coordinators?.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500" mt={2}>
                          Email: {coordinators?.email}
                        </Text>
                        <Button
                          colorScheme="teal"
                          variant={"solid"}
                          size="sm"
                          mt={4}
                          as={Link}
                          to={`/profile/${coordinators?.id}`}
                        >
                          Contact
                        </Button>
                        <Button
                          colorScheme="red"
                          variant={"ghost"}
                          size="sm"
                          mt={4}
                          ml={1}
                        >
                          <FaTrash />
                        </Button>
                      </Box>
                    );
                  })}
                  <Box
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    mb={4}
                    w={"150px"}
                    _hover={{
                      bg: "teal.50",
                      scale: "1.2",
                    }}
                    transition={"1s ease all"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    cursor={"pointer"}
                  >
                    <AddIcon />
                  </Box>
                </Flex>
              </SkeletonText>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Company HR's
              </Text>
              <Flex gap={3} mt={6}>
                {loading && (
                  <>
                    <Skeleton isLoaded={!loading}>
                      <Box
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="md"
                        mb={4}
                        w={"300px"}
                        h={"200px"}
                        transition={"1s ease all"}
                      ></Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                      <Box
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="md"
                        mb={4}
                        w={"300px"}
                        h={"200px"}
                        transition={"1s ease all"}
                      ></Box>
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                      <Box
                        p={4}
                        borderWidth={1}
                        borderRadius="md"
                        boxShadow="md"
                        mb={4}
                        w={"300px"}
                        h={"200px"}
                        transition={"1s ease all"}
                      ></Box>
                    </Skeleton>
                  </>
                )}
                {!loading && (
                  <>
                    {company?.hr_details.map((hr, index) => {
                      return (
                        <Box
                          key={index}
                          p={4}
                          borderWidth={1}
                          borderRadius="md"
                          boxShadow="md"
                          mb={4}
                          w={"fit-content"}
                          transition={"1s ease all"}
                        >
                          <Text
                            fontSize="lg"
                            color={"teal.500"}
                            fontWeight="bold"
                          >
                            {hr?.name}
                          </Text>
                          <Text fontSize="sm" color="gray.500" mt={2}>
                            Mobile: {hr?.phone}
                          </Text>
                          <Text fontSize="sm" color="gray.500" mt={2}>
                            Email: {hr?.email}
                          </Text>
                          <Button
                            colorScheme="teal"
                            variant={"solid"}
                            size="sm"
                            mt={4}
                          >
                            Contact
                          </Button>
                          <Button
                            colorScheme="red"
                            variant={"ghost"}
                            size="sm"
                            mt={4}
                            ml={1}
                          >
                            <FaTrash />
                          </Button>
                        </Box>
                      );
                    })}
                  </>
                )}
                <Box
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  mb={4}
                  w={"150px"}
                  _hover={{
                    bg: "teal.50",
                    scale: "1.2",
                  }}
                  transition={"1s ease all"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  cursor={"pointer"}
                >
                  <AddIcon />
                </Box>
              </Flex>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={
              company?.blacklist
                ? useColorModeValue("red.500", "red.50")
                : useColorModeValue("gray.800", "gray.50")
            }
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            {company?.blacklist && (
              <>
                <MdBlockFlipped />
                Blocked
              </>
            )}
            {!company?.blacklist && <>Contact</>}
          </Button>
          <BlacklistAddCompanyAlert
            onClose={addblacklistBtn.onClose}
            isOpen={addblacklistBtn.isOpen}
            pk={id}
          />
          {!company?.blacklist && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
            >
              <MdBlockFlipped />
              <Text cursor={"pointer"}>
                Want to Add in Blacklist?{" "}
                <Button
                  variant={"link"}
                  colorScheme="red"
                  onClick={addblacklistBtn.onOpen}
                >
                  Click here!
                </Button>
              </Text>
            </Stack>
          )}
        </Stack>
      </SimpleGrid>
      <CommentSection id={Number(id)} />
    </Container>
  );
}
