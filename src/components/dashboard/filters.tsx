import {
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
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
  Button,
  GridItem,
  SliderMark,
  RangeSliderMark,
  HStack,
} from "@chakra-ui/react";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select1, { MultiValue } from "react-select";
import OptionBaseType from "react-select";
import SpinnerFullScreen from "../common/loader";
import { FaEraser, FaFilter } from "react-icons/fa";
import { getCompanyListRequestAction } from "../../redux-store/reducer/slice/company/listSlice";
import { MdRefresh, MdResetTv } from "react-icons/md";

interface FiltersProps {
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
}
interface filterData {
  active?: string;
  importance?: {
    end: number;
    start: number;
  };
  salary?: {
    end: number;
    start: number;
  };
  hiring_tags?: string[];
  job_tags?: string[];
}

const Filters: React.FC<FiltersProps> = ({ onOpen }) => {
  const dispatch = useDispatch();
  const companyjobtags = useSelector((state: any) => state.getcompanyjobtags);
  const getcompanylist = useSelector((state: any) => state.getcompanylist);
  const companyhiringtags = useSelector(
    (state: any) => state.getcompanyhiringtags
  );
  const token = useSelector((state: any) => state.getauth.data.token.access);
  const [data, setData] = useState<filterData>({});
  const [selectedJobTags, setSelectedJobTags] = useState<OptionBaseType[]>([]);
  const [selectedHiringTags, setSelectedHiringTags] = useState<
    OptionBaseType[]
  >([]);
  const handleSelectChange = (selectedOptions: MultiValue<OptionBaseType>) => {
    const d = selectedOptions as OptionBaseType[];
    setData((prevData: filterData) => ({
      ...prevData,
      job_tags: d.map((obj: any) => obj.value),
    }));
    setSelectedJobTags(d);
  };
  const handleSelectChange1 = (selectedOptions: MultiValue<OptionBaseType>) => {
    const d = selectedOptions as OptionBaseType[];
    setData((prevData: filterData) => ({
      ...prevData,
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
  const handleFilter = async (e: any) => {
    e.preventDefault();
    const queryString = objectToQueryString(data);
    console.log(queryString);
    dispatch(getCompanyListRequestAction({ token: token, query: queryString }));
  };
  return (
    <Flex
      flexDir={{ base: "column", md: "row", sm: "column" }}
      px={"3"}
      alignItems={"flex-start"}
      h={"100%"}
      flexWrap={"wrap"}
      as="form"
      noValidate
      onSubmit={handleFilter}
    >
      <Stack spacing={6}>
        <Checkbox
          name="active"
          onChange={(e) => {
            setData((prevData) => ({
              ...prevData,
              [e.target.name]: e.target.checked ? "True" : "False",
            }));
          }}
        >
          Only Active?
        </Checkbox>
      </Stack>
      <FormControl my={""}>
        <FormLabel as="legend">Salary</FormLabel>
        <RangeSlider
          max={20000}
          min={5000}
          aria-label={["min", "max"]}
          defaultValue={[7000, 8000]}
          onChangeStart={(val) => {
            setData((prevData) => ({
              ...prevData,
              salary: {
                end: val[1],
                start: val[0],
              },
            }));
          }}
          onChangeEnd={(val) => {
            setData((prevData) => ({
              ...prevData,
              salary: {
                end: val[1],
                start: val[0],
              },
            }));
          }}
          name={"salary"}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <FormHelperText>
          {data?.salary?.start}-{data?.salary?.end}
        </FormHelperText>
      </FormControl>
      <FormControl my={""}>
        <FormLabel as="legend">Importance</FormLabel>
        <RangeSlider
          max={10}
          min={0}
          aria-label={["min", "max"]}
          defaultValue={[5, 8]}
          name={"importance"}
          onChangeStart={(val) => {
            setData((prevData) => ({
              ...prevData,
              importance: {
                end: val[1],
                start: val[0],
              },
            }));
          }}
          onChangeEnd={(val) => {
            setData((prevData) => ({
              ...prevData,
              importance: {
                end: val[1],
                start: val[0],
              },
            }));
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
        <FormHelperText>
          {data?.importance?.start}-{data?.importance?.end}
        </FormHelperText>
      </FormControl>
      <FormControl as={GridItem} colSpan={[3, 2]}>
        <FormLabel as="legend">Job Tags</FormLabel>
        <Select1
          isMulti
          options={jobtagsOptions}
          value={selectedJobTags}
          onChange={handleSelectChange}
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[3, 2]}>
        <FormLabel as="legend">Hiring Tags</FormLabel>
        <Select1
          isMulti
          options={hiringtagsOptions}
          value={selectedHiringTags}
          onChange={handleSelectChange1}
        />
      </FormControl>
      <FormControl as="fieldset">
        <Button mt="2" colorScheme="teal" variant={"solid"} type="submit">
          <FaFilter />
        </Button>
        <Button
          mt="2"
          ml={2}
          colorScheme="teal"
          variant={"ghost"}
          onClick={() => {
            setData({});
            setSelectedHiringTags([]);
            setSelectedJobTags([]);
          }}
        >
          <FaEraser />
        </Button>
      </FormControl>
      <Stat mt={""} as="fieldset">
        <StatLabel>Total Companies</StatLabel>

        <StatNumber>
          {!getcompanylist?.isLoading && getcompanylist?.companies?.length}
          {getcompanylist?.isLoading && "Loading.."}
        </StatNumber>
      </Stat>
      <SpinnerFullScreen loading={getcompanylist?.isLoading} />
    </Flex>
  );
};

export default Filters;

const objectToQueryString = (data: any) => {
  const params = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "object") {
      Object.keys(data[key]).forEach((nestedKey) => {
        params.append(`${key}`, data[key][nestedKey]);
      });
    } else {
      params.append(key, data[key]);
    }
  });
  return params.toString();
};
