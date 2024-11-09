import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  label: {
    fontSize: "16px",
    fontWeight: 500,
  },
  control: {
    padding: 3,
    borderRadius: "8px",

    _checked: {
      bg: "buttonPurple",
      borderColor: "buttonPurple",
      _hover: {
        borderColor: "buttonPurple",
        bg: "buttonPurple",
      },
    },
  },
});

export const Checkbox = defineMultiStyleConfig({ baseStyle });
