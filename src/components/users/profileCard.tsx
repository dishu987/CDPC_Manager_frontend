import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Grid,
  GridItem,
  Flex,
  Avatar,
  Badge,
  VStack,
  Heading,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface UserProfilePageProps {
  data: any;
  isLoading: Boolean;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  data,
  isLoading,
}) => {
  const getcompanylist = useSelector((state: any) => state.getcompanylist);
  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        Loading...
      </Box>
    );
  }
  return (
    <Box p={4} boxShadow={"md"}>
      <HStack alignItems={"flex-start"}>
        {" "}
        <VStack gap={5}>
          <Flex w={"100%"}>
            <Heading as="h5" size="md">
              Introduction
            </Heading>
          </Flex>
          <Flex boxShadow={"md"} w={"100%"} p={4}>
            <Avatar icon={<FaUser />} />
            <Box ml="3">
              <Text fontWeight="bold" fontSize={"2xl"} textColor={"teal.500"}>
                {data?.name}
                <Badge ml="1" colorScheme="green">
                  New
                </Badge>
              </Text>
              <Text fontSize="sm">{data?.role_group}</Text>
            </Box>
          </Flex>
          <Flex w={"100%"}>
            <Heading as="h5" size="md">
              Personal Details
            </Heading>
          </Flex>
          <Grid boxShadow={"md"} templateColumns="repeat(2, 1fr)" gap={7} p={5}>
            <GridItem>
              <Text fontWeight="bold">ID:</Text>
              <Text>{data?.id}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Name:</Text>
              <Text>{data?.name}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Email:</Text>
              <Text>{data?.email}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Date Joined:</Text>
              <Text>{data?.date_joined}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Created At:</Text>
              <Text>{data?.created_at}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Updated At:</Text>
              <Text>{data?.updated_at}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Mobile:</Text>
              <Text>{data?.mobile}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Gender:</Text>
              <Text>{data?.gender}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Address:</Text>
              <Text>{data?.address}</Text>
            </GridItem>
          </Grid>
        </VStack>
        <VStack gap={5}>
          <Flex w={"100%"}>
            <Heading as="h5" size="md">
              Assigned Companies
            </Heading>
          </Flex>
          <Flex
            boxShadow={"md"}
            w={"900px"}
            p={4}
            overflow={"auto"}
            maxH={"470px"}
          >
            <Table overflow={"auto"}>
              <TableCaption>
                List of assigned companies to coordinator
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Sr. No.</Th>
                  <Th>Company</Th>
                  <Th>Salary</Th>
                  <Th>Importance</Th>
                  <Th> Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {getcompanylist.companies
                  .filter((obj: any) =>
                    data?.companies_assigned.includes(obj.id)
                  )
                  .map((company: any, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{company.name}</Td>
                        <Td>{company.salary}</Td>
                        <Td>{company.importance}</Td>
                        <Td>
                          <Button
                            variant={"link"}
                            colorScheme="teal"
                            as={Link}
                            to={`/company/${company.id}`}
                          >
                            <ExternalLinkIcon />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Flex>
        </VStack>
        {/* <Button w={"400px"} variant={"ghost"} colorScheme="red">
            Edit <EditIcon ml={2} />
          </Button> */}
      </HStack>
    </Box>
  );
};

export default UserProfilePage;
