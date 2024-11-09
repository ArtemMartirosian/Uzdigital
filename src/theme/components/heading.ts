import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  color: "text",
  _dark: {
    color: "customWhite",
  },
});

const Heading = defineStyleConfig({
  baseStyle,
});

export default Heading;
