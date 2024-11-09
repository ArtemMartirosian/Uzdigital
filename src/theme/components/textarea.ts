import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const customTextarea = defineStyle({
  fontSize: "16px",
  borderRadius: "14px",
  color: "text",
  fontWeight: "500",
  borderWidth: "1px",
  borderColor: "gray.100",
  bg: "transparent",
  transition: "200ms",

  _hover: {
    borderColor: "activePurple",
  },

  _focus: {
    borderColor: "activePurple",
  },

  _dark: {
    color: "customWhite",
    borderColor: "black.400",

    _hover: {
      borderColor: "activePurple",
    },

    _focus: {
      borderColor: "activePurple",
    },
  },
});

const Textarea = defineStyleConfig({
  variants: { customTextarea },
  defaultProps: {
    variant: "customTextarea",
  },
});

export default Textarea;
