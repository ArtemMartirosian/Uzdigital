import {
  HStack,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  ChakraStylesConfig,
  ControlProps,
  DropdownIndicatorProps,
  OptionProps,
  Props,
  Select,
  chakraComponents,
  components,
} from "chakra-react-select";
import { ArrowDown } from "../../assets/icons/ArrowDown";
import { OptionCheckIcon } from "../../assets/icons/OptionCheckIcon";
import { Map } from "../../assets/icons/Map";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDown
        transform={`rotate(${props.selectProps.menuIsOpen ? -180 : 0}deg)`}
        transition="200ms"
      />
    </components.DropdownIndicator>
  );
};

const customControl = (props: ControlProps) => {
  return (
    <InputGroup minH={"50px"}>
      <InputLeftElement pl={"18px"} pt={"15px"}>
        <Map boxSize={"20px"} />
      </InputLeftElement>
      <chakraComponents.Control {...props} />;
    </InputGroup>
  );
};

const CustomOption = ({ innerProps, data, isSelected }: OptionProps) => {
  const { label } = data as { label: string };

  return (
    <HStack
      p="12px"
      _hover={{ bg: "purple.100" }}
      _dark={{
        bg: isSelected ? "black.600" : "",
        _hover: { bg: "black.400" },
      }}
      transition="200ms"
      bg={isSelected ? "purple.100" : ""}
      color={isSelected ? "purple.600" : "gray.400"}
      borderBottom={"1px solid inputGrey"}
      {...innerProps}
    >
      <Text
        as="span"
        fontSize="14px"
        fontWeight="500"
        color="text"
        _dark={{ color: "customWhite" }}
      >
        {label}
      </Text>
      <Spacer />
      {isSelected && <OptionCheckIcon />}
    </HStack>
  );
};

const chakraStyles: ChakraStylesConfig = {
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  control: (provided) => ({
    ...provided,
    pl: "30px",
    _placeholder: {
      color: "red",
    },
  }),
};

const customComponents = {
  DropdownIndicator,
  Option: CustomOption,
  Control: customControl,
};

export const CSelect = ({ ...props }: Props) => {
  return (
    <Select
      chakraStyles={chakraStyles}
      components={customComponents}
      focusBorderColor="activePurple"
      selectedOptionStyle="check"
      isSearchable={false}
      {...props}
    />
  );
};
