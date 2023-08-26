import React, { useState, FormEvent, useEffect } from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  FormHelperText,
  useToast,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalHeader,
  HStack,
  Text,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { CompanyInterface } from "../../../interface/company/info";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumbs from "../../common/breadcrumps";
import { getBreadcrumpAddAction } from "../../../redux-store/reducer/slice/breadCrumps";
import { UsersInterface } from "../../../interface/redux-state/UsersListInterface";
import { itCompanyLocations } from "../../../utils/locationContants";
import Select1, { MultiValue } from "react-select";
import OptionBaseType from "react-select";
import CompanyRegisterService from "../../../services/company/add";

interface FormProps {
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  setCompany?: any | null;
  company?: CompanyInterface | null;
}

const Form1: React.FC<FormProps> = ({ handleChange }) => {
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
        Company Details 1
      </Heading>
      <VStack gap={2}>
        <FormControl>
          <FormLabel htmlFor="name" fontWeight="normal">
            Company Name
          </FormLabel>
          <Input
            id="name"
            placeholder="ie. google"
            name="name"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="about" fontWeight="normal">
            About
          </FormLabel>
          <Textarea
            placeholder="About Company"
            name="about"
            onChange={handleChange}
          />
        </FormControl>
      </VStack>
    </>
  );
};
interface HRInterface {
  name: string;
  email: string;
  phone_number: string;
}

const Form2: React.FC<FormProps> = ({ handleChange, setCompany, company }) => {
  const userslist = useSelector((state: any) => state.getuserslist);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hr, setHr] = useState<HRInterface>({
    name: "",
    email: "",
    phone_number: "",
  });
  const [selectedCoordinators, setSelectedCoordinators] = useState<
    OptionBaseType[]
  >([]);
  const handleSelectChange = (selectedOptions: MultiValue<OptionBaseType>) => {
    const d = selectedOptions as OptionBaseType[];
    setCompany((prevCompany: CompanyInterface) => ({
      ...prevCompany,
      assigned_coordinators: d.map((obj: any) => obj.value),
    }));
    setSelectedCoordinators(d);
  };
  const coordinatorOptions = userslist.users.map((user: UsersInterface) => ({
    value: user.id,
    label: user.email,
  }));
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHr((prevHr: any) => ({
      ...prevHr,
      [name]: value,
    }));
  };
  const handleAddHR = () => {
    setCompany((prevCompany: CompanyInterface) => ({
      ...prevCompany,
      hr_details: [...prevCompany.hr_details, hr],
    }));
    setHr({
      name: "",
      email: "",
      phone_number: "",
    });
    onClose();
  };

  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal" mb="2%">
        Company Details 2
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="spoc"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          SPOC
        </FormLabel>
        <Select
          id="country"
          autoComplete="country"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          name="spoc"
          onChange={handleChange}
        >
          <option>Select Spoc..</option>
          {!userslist.isLoading &&
            userslist.users.map((user: UsersInterface, index: String) => {
              return (
                <option
                  key={String(index)}
                  value={String(user.id)}
                  selected={
                    String(company?.spoc) === String(user.id) ? true : false
                  }
                >
                  Name: {user.name}/ Email: {user.email}
                </option>
              );
            })}
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3]} mt={3}>
        <FormLabel
          htmlFor=""
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Assign Coordinators
        </FormLabel>
        <Select1
          isMulti
          options={coordinatorOptions}
          value={selectedCoordinators}
          onChange={handleSelectChange}
        />
      </FormControl>
      <HStack spacing={1} mt={2}>
        {company?.assigned_coordinators.map((user, index) => (
          <Tag
            size={"md"}
            key={index}
            borderRadius="full"
            variant="solid"
            colorScheme="teal"
          >
            <TagLabel>
              {userslist.users.filter((obj: any) => obj.id == user)[0].email}
            </TagLabel>
            {/* <TagCloseButton /> */}
          </Tag>
        ))}
      </HStack>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="location"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Location
        </FormLabel>
        <Select
          id="location"
          autoComplete="country"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          name="job_location"
          onChange={handleChange}
        >
          <option selected>Select location...</option>
          {itCompanyLocations.map((value: string, index) => {
            return (
              <option
                value={value}
                key={Number(index)}
                selected={
                  String(company?.job_location) === String(value) ? true : false
                }
              >
                {value}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="salary"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Salary
        </FormLabel>
        <Input
          type="number"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          name="salary"
          onChange={handleChange}
          rounded="md"
          min={0}
          value={String(company?.salary)}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="years_of_collaboration"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Years of collaboration
        </FormLabel>
        <Input
          type="text"
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          name="years_of_collaboration"
          onChange={handleChange}
          rounded="md"
          value={String(company?.years_of_collaboration)}
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="importance"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Importance
        </FormLabel>
        <Input
          type="number"
          autoComplete="state"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          name="importance"
          onChange={handleChange}
          min={0}
          max={10}
          value={String(company?.importance)}
        />
        <FormHelperText>Give importance between 0 to 10</FormHelperText>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="hr_details"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          HR Details
        </FormLabel>
        <Button
          variant={"link"}
          colorScheme="facebook"
          onClick={() => onOpen()}
        >
          <AddIcon mr={2} /> New
        </Button>
      </FormControl>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>HR Details</ModalHeader>
          <ModalBody>
            <SimpleGrid columns={1} spacing={2}>
              <FormControl as={GridItem} colSpan={[3, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Name
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  id="state"
                  autoComplete="state"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={handleChange1}
                />
              </FormControl>
              <FormControl as={GridItem} colSpan={[3, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Email
                </FormLabel>
                <Input
                  type="email"
                  name="email"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={handleChange1}
                />
              </FormControl>
              <FormControl as={GridItem} colSpan={[3, 2]}>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color="gray.700"
                  _dark={{
                    color: "gray.50",
                  }}
                >
                  Mobile
                </FormLabel>
                <Input
                  type="text"
                  name="phone_number"
                  focusBorderColor="brand.400"
                  shadow="sm"
                  size="sm"
                  w="full"
                  rounded="md"
                  onChange={handleChange1}
                />
              </FormControl>
              <HStack justify={"end"} mb={"3"}>
                <Button
                  w="7rem"
                  colorScheme="red"
                  variant="solid"
                  onClick={handleAddHR}
                >
                  Add
                </Button>
              </HStack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Form3: React.FC<FormProps> = ({ handleChange, setCompany, company }) => {
  const companyjobtags = useSelector((state: any) => state.getcompanyjobtags);
  const companyhiringtags = useSelector(
    (state: any) => state.getcompanyhiringtags
  );
  const [selectedJobTags, setSelectedJobTags] = useState<OptionBaseType[]>([]);
  const [selectedHiringTags, setSelectedHiringTags] = useState<
    OptionBaseType[]
  >([]);
  const handleSelectChange = (selectedOptions: MultiValue<OptionBaseType>) => {
    const d = selectedOptions as OptionBaseType[];
    setCompany((prevCompany: CompanyInterface) => ({
      ...prevCompany,
      job_tags: d.map((obj: any) => obj.value),
    }));
    setSelectedJobTags(d);
  };
  const handleSelectChange1 = (selectedOptions: MultiValue<OptionBaseType>) => {
    const d = selectedOptions as OptionBaseType[];
    setCompany((prevCompany: CompanyInterface) => ({
      ...prevCompany,
      hiring_tags: d.map((obj: any) => obj.value),
    }));
    setSelectedHiringTags(d);
  };
  const jobtagsOptions = companyjobtags.tags.map((tag: any) => ({
    value: tag.id,
    label: tag.name,
  }));
  const hiringtagsOptions = companyhiringtags.tags.map((tag: any) => ({
    value: tag.id,
    label: tag.name,
  }));
  return (
    <>
      <Heading w="100%" textAlign="center" fontWeight="normal">
        Company Details 3
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Company Job Tags
          </FormLabel>

          <Select1
            isMulti
            options={jobtagsOptions}
            value={selectedJobTags}
            onChange={handleSelectChange}
          />
        </FormControl>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <HStack spacing={1} mt={2}>
            {company?.job_tags.map((tag: any, index) => (
              <Tag
                size={"md"}
                key={index}
                borderRadius="full"
                variant="solid"
                colorScheme="teal"
              >
                <TagLabel>
                  {
                    companyjobtags.tags.filter((obj: any) => obj.id == tag)[0]
                      .name
                  }
                </TagLabel>
                {/* <TagCloseButton /> */}
              </Tag>
            ))}
          </HStack>
        </FormControl>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Company Hiring Tags
          </FormLabel>

          <Select1
            isMulti
            options={hiringtagsOptions}
            value={selectedHiringTags}
            onChange={handleSelectChange1}
          />
        </FormControl>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <HStack spacing={1} mt={2}>
            {company?.hiring_tags.map((tag: any, index) => (
              <Tag
                size={"md"}
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
          </HStack>
        </FormControl>
        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            htmlFor="additional_info"
          >
            Additional Info
          </FormLabel>
          <Textarea
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: "sm",
            }}
            name="additional_info"
            onChange={handleChange}
          />
          <FormHelperText>
            Brief description for company profile. URLs are hyperlinked.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const intialValue = {
  name: "",
  about: "",
  spoc: { name: "", email: "" },
  job_location: "",
  salary: 0,
  years_of_collaboration: 0,
  importance: 0,
  hr_details: [],
  job_tags: [],
  hiring_tags: [],
  assigned_coordinators: [],
  additional_info: "",
};
const isFormValueFilled = (formValue: any): boolean => {
  for (const field in formValue) {
    if (typeof formValue[field] === "object") {
      // Check if any nested field is empty
      if (!isFormValueFilled(formValue[field])) {
        return false;
      }
    } else if (
      formValue[field] === "" ||
      formValue[field] === null ||
      formValue[field] === undefined
    ) {
      return false;
    }
  }
  return true;
};
const Multistep: React.FC = () => {
  const toast = useToast();
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<CompanyInterface>(intialValue);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getBreadcrumpAddAction([
        { name: "Company", url: "/" },
        { name: "Add", url: null },
      ])
    );
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValueFilled(company)) {
      toast({
        title: "Error.",
        description: "Plesae fill all fields first.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await CompanyRegisterService.companyRegister(token, company);
      console.log(res);
      toast({
        title: "Company Registered.",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setError(false);
    } catch (err) {
      toast({
        title: "Error.",
        description: "Company already existed or Wrong Field Given.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      setError(true);
    }
    setCompany(intialValue);
    setLoading(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };
  const handleDeleteHR = (index: number) => {
    setCompany((prevCompany) => ({
      ...prevCompany,
      hr_details: prevCompany.hr_details.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <Box p={5}>
        <Box ml={4}>
          <Breadcrumbs />
        </Box>
        <Box
          p={10}
          m="10px auto"
          as="form"
          noValidate
          onSubmit={handleSubmit}
          boxShadow={"md"}
          mt={5}
          mx={5}
        >
          {step === 1 ? (
            <Form1 handleChange={handleChange} />
          ) : step === 2 ? (
            <>
              <Form2
                handleChange={handleChange}
                setCompany={setCompany}
                company={company}
              />
              <Flex gap={3} mt={6} flexWrap={"wrap"}>
                {company.hr_details &&
                  company.hr_details.map((hr, index) => (
                    <Box
                      key={index}
                      p={4}
                      borderWidth={1}
                      borderRadius="md"
                      boxShadow="md"
                      mb={4}
                      w={{
                        base: "100%",
                        sm: "100%",
                        md: "fit-content",
                        lg: "fit-content",
                      }}
                      transition={"1s ease all"}
                    >
                      <Text fontSize="lg" color={"teal.500"} fontWeight="bold">
                        {hr?.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500" mt={2}>
                        Mobile: {hr?.phone}
                      </Text>
                      <Text fontSize="sm" color="gray.500" mt={2}>
                        Email: {hr?.email}
                      </Text>
                      <Button
                        colorScheme="red"
                        variant={"outline"}
                        size="sm"
                        mt={4}
                        onClick={() => handleDeleteHR(index)}
                      >
                        Remove <DeleteIcon ml={2} />
                      </Button>
                    </Box>
                  ))}
              </Flex>
            </>
          ) : (
            <Form3
              handleChange={handleChange}
              setCompany={setCompany}
              company={company}
            />
          )}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                  }}
                  isDisabled={step === 1}
                  colorScheme="teal"
                  variant="solid"
                  w="7rem"
                  mr="5%"
                >
                  Back
                </Button>
                <Button
                  w="7rem"
                  isDisabled={step === 3}
                  onClick={() => {
                    setStep(step + 1);
                  }}
                  colorScheme="teal"
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
              {step === 3 ? (
                <Button
                  w="7rem"
                  colorScheme="red"
                  variant="solid"
                  type="submit"
                  isLoading={loading}
                  loadingText={"Please Wait.."}
                >
                  Submit
                </Button>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );
};

export default Multistep;
