import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Breadcrumbs: React.FC = () => {
  const breadcrumps = useSelector((state: any) => state.getbreadcrumps);
  return (
    <Box w="full" p="3" rounded="sm">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumps &&
          breadcrumps.links.map((bread: any, index: any) => {
            return (
              <BreadcrumbItem
                key={index}
                isCurrentPage={bread.url === null ? true : false}
              >
                <BreadcrumbLink
                  as={Link}
                  to={bread.url === null ? "" : bread.url}
                >
                  {bread.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
      </Breadcrumb>
    </Box>
  );
};

export default Breadcrumbs;
