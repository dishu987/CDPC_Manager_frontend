import { useState } from "react";
import { Box, Select } from "@chakra-ui/react";

type FilterOption = {
  value: string;
  label: string;
};

const options: FilterOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

interface FilterDropdownProps {
  onChange: (selectedOption: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].value
  );

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
    onChange(value);
  };

  return (
    <Box>
      <Select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default FilterDropdown;
