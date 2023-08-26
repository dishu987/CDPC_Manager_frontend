import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Text,
  Progress,
  Tooltip,
  Tag,
  TagLabel,
  Box,
} from "@chakra-ui/react";
import { MdOutlineBlock } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getBreadcrumpAddAction } from "../../redux-store/reducer/slice/breadCrumps";
import SpinnerFullScreen from "./loader";

const DataTable = () => {
  const getcompanylist = useSelector((state: any) => state.getcompanylist);
  const companyjobtags = useSelector((state: any) => state.getcompanyjobtags);
  const companyhiringtags = useSelector(
    (state: any) => state.getcompanyhiringtags
  );
  const dispatch = useDispatch();
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Company List</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Salary(Rs.)</Th>
            <Th>Importance</Th>
            <Th title="Years of Collaboration">YOC</Th>
            <Th>Hiring Tags</Th>
            <Th>Job Tags</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody textAlign={"center"}>
          {!getcompanylist.isLoading &&
            getcompanylist.isSuccessful &&
            [...getcompanylist.companies]
              .sort((a: any, b: any) => {
                if (a.importance === b.importance) {
                  return b.years_of_collaboration - a.years_of_collaboration;
                }
                return b.importance - a.importance;
              })
              .map((company: any, index: any) => {
                return (
                  <Tr textAlign={"center"} key={index}>
                    <Td>{company.name}</Td>
                    <Td>{company.salary}</Td>
                    <Td>
                      <Tooltip
                        hasArrow
                        label={company.importance}
                        bg="gray.300"
                        color="black"
                      >
                        <Progress
                          max={10}
                          min={0}
                          colorScheme={
                            company.importance <= 5 ? "red" : "green"
                          }
                          value={company.importance}
                          isIndeterminate={false}
                        />
                      </Tooltip>
                    </Td>
                    <Td>{company.years_of_collaboration} Years</Td>
                    <Td>
                      <Box
                        gap={2}
                        display={"flex"}
                        flexWrap={"wrap"}
                        w={"200px"}
                      >
                        {company?.hiring_tags.map((tag: any, index: any) => (
                          <Tag
                            size={"sm"}
                            key={index}
                            borderRadius="full"
                            variant="solid"
                            colorScheme="teal"
                          >
                            <TagLabel>
                              {
                                companyhiringtags.tags.filter(
                                  (obj: any) => obj.id == tag
                                )[0].name
                              }
                            </TagLabel>
                            {/* <TagCloseButton /> */}
                          </Tag>
                        ))}
                      </Box>
                    </Td>
                    <Td gap={2}>
                      <Box
                        gap={2}
                        display={"flex"}
                        flexWrap={"wrap"}
                        w={"200px"}
                      >
                        {company?.job_tags.map((tag: any, index: any) => (
                          <Tag
                            size={"sm"}
                            key={index}
                            borderRadius="full"
                            variant="solid"
                            colorScheme="teal"
                          >
                            <TagLabel>
                              {
                                companyjobtags.tags.filter(
                                  (obj: any) => obj.id == tag
                                )[0].name
                              }
                            </TagLabel>
                            {/* <TagCloseButton /> */}
                          </Tag>
                        ))}
                      </Box>
                    </Td>
                    <Td>
                      {!company.blacklist && (
                        <>
                          {company.status ? (
                            <Text color="green.400" fontWeight={"bold"}>
                              Active
                            </Text>
                          ) : (
                            <Text color="red.400" fontWeight={"bold"}>
                              Inactive
                            </Text>
                          )}
                        </>
                      )}
                      {company.blacklist && (
                        <>
                          {" "}
                          <Text
                            display={"flex"}
                            color="red.500"
                            fontWeight={"bold"}
                            alignItems={"center"}
                          >
                            <MdOutlineBlock mr={2} /> Blacklisted
                          </Text>
                        </>
                      )}
                    </Td>
                    <Td>
                      <Button
                        as={Link}
                        to={`company/${company.id}`}
                        variant="link"
                        onClick={() =>
                          dispatch(
                            getBreadcrumpAddAction([
                              { name: "Company", url: "/" },
                              { name: company?.name, url: null },
                            ])
                          )
                        }
                      >
                        Open <ExternalLinkIcon ml={2} />
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
        </Tbody>
      </Table>
      <SpinnerFullScreen loading={getcompanylist.isLoading} />
    </TableContainer>
  );
};

export default DataTable;
