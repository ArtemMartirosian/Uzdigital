import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    boxSize: "24px",
    borderColor: "purple.100",
    borderWidth: "3px",
    borderStyle: "solid",
    outline: "none",

    _before: {
    
    },

    _checked: {
      bg: "customWhite",
      borderWidth: "3px",
      borderColor: "#8358FD",
      _hover: {
        bg: "white",
        borderColor: "#8358FD",
      },

      _before: {
        bg: "#8358FD",
        boxSize: "70%",
      },
    },

    _dark: {
      borderColor: "purple.200",

      _checked: {
        bg: "black.900",
        borderColor: "activePurple",
      },
    },
  },

  container: {
    cursor: "pointer",
  },
});

const languageRadio = definePartsStyle({
  container: {
    width: "100%",
    px: "16px",
    py: "14px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "purple.100",
    borderRadius: "14px",
    transition: "200ms",

    _hover: {
      borderColor: "activePurple",
    },

    _checked: {
      bg: "purple.100",
    },

    _dark: {
      borderColor: "black.600",

      _checked: {
        bg: "black.600",
      },

      _hover: {
        borderColor: "activePurple",
      },
    },
  },

  label: {
    fontWeight: "500",
    fontSize: "16px",
    margin: "0",
  },
});

const modalLanguage = definePartsStyle({
  container: {
    width: "100%",
    px: "16px",
    py: "14px",
    borderRadius: "0px",
    transition: "200ms",

    _hover: {
      bg: "purple.50",
    },

    _checked: {
      borderColor: "activePurple",
    },

    _focus: {
      outline: "none",
    },

    _dark: {
      _checked: {
        borderColor: "activePurple",
        outline: "none",
      },

      _focus: {
        outline: "none",
      },

      _hover: {
        bg: "black.400",
      },
    },
  },

  label: {
    fontWeight: "500",
    fontSize: "16px",
    margin: "0",
  },
});

const variants = {
  languageRadio,
  modalLanguage,
};

const Radio = defineMultiStyleConfig({
  baseStyle,
  variants,
});

export default Radio;
