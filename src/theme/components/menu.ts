import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  list: {
    overflow: "hidden",
    py: "0px",
    borderRadius: "12px",
    borderWidth: "1px",
    borderColor: "gray.100",
    minWidth: "fit-content",
    bg: "white",
  },

  item: {
    py: "10px",
    bg: "transparent",
    fontSize: "14px",
    fontWeight: "500",

    _hover: {
      bg: "palePurple",
    },
  },

  button: {
    _active: {
      borderColor: "activePurple",
    },
  },
});

const Menu = defineMultiStyleConfig({ baseStyle });

export default Menu;
