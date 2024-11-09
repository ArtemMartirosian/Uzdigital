import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  body: {
    p: "16px 14px",
  },
  dialog: {
    bg: "customWhite",
    w: "80%",
    p: "0px",
    borderRadius: "16px",

    _dark: {
      bg: "black.600",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "black.400",
    },
  },
});

const Modal = defineMultiStyleConfig({
  baseStyle,
});

export default Modal;
