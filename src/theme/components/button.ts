import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderRadius: "100px",
  padding: "16px 18px",
  fontSize: "16px",
  fontWeight: "500",
  textAlign: "center",
  transition: "200ms",
});

const primary = defineStyle({
  bg: "buttonPurple",
  color: "white",
  fontWeight: "600",
  minH: "50px",

  "@media (hover: hover)": {
    _hover: {
      bg: "buttonPurpleHover",
    },
  },

  _hover: {
    _disabled: {
      bg: "buttonPurpleDisabled",
    },
  },

  _active: {
    bg: "buttonPurple",
    boxShadow: "0px 0px 0px 2.5px rgba(128, 0, 255, 0.10)",
  },
});

const secondary = defineStyle({
  bg: "transparent",
  color: "text",
  fontWeight: "700",
  borderWidth: "1px",
  borderColor: "gray.100",
  minH: "50px",

  "@media (hover: hover)": {
    _hover: {
      bg: "palePurple",
      borderColor: "lightPurple",

      _disabled: {
        opacity: "0.5",
      },
    },
  },

  _active: {
    boxShadow: "0px 0px 0px 2.5px rgba(128, 0, 255, 0.04)",
    bg: "transparent",
  },
});

const outline = defineStyle({
  minH: "50px",
});

const customIconButton = defineStyle({
  bg: "transparent",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "gray.100",
  borderRadius: "10px",
  p: "8px",
  boxSizing: "content-box",
  boxSize: "40px",
  minH: "40px",

  "@media (hover: hover)": {
    _hover: {
      bg: "palePurple",
      borderColor: "lightPurple",

      _disabled: {
        opacity: "0.5",
      },
    },
  },

  _active: {
    boxShadow: "0px 0px 0px 2.5px rgba(128, 0, 255, 0.04)",
    bg: "transparent",
  },
});

const variants = {
  primary,
  secondary,
  outline,
  customIconButton,
};

const Button = defineStyleConfig({
  baseStyle,
  variants,
  defaultProps: {
    variant: "primary",
  },
});

export default Button;
