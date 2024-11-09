import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const CustomInput = definePartsStyle({
  field: {
    fontSize: "16px",
    minH: "50px",
    borderRadius: "14px",
    color: "text",
    fontWeight: "500",
    borderWidth: "1px",
    borderColor: "gray.100",
    bg: "transparent",

    _autofill: {
      bg: "transparent",
    },

    _hover: {
      borderColor: "activePurple",
    },

    _focus: {
      borderColor: "activePurple",
    },

    _invalid: {
      borderColor: "error",
    },
  },

});

const Input = defineMultiStyleConfig({
  variants: { CustomInput },
  defaultProps: { variant: "CustomInput" },

});

export default Input;
