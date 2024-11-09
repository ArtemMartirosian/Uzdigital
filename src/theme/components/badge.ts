import { defineStyle, defineStyleConfig } from "@chakra-ui/react";


const baseStyle = defineStyle({
    borderRadius: "16px",
    px: 2,
    h: "20px",
    fontSize: "xs",
    fontWeight: 500,
    color: "black",
    background: "#F9FAFB"
});


const Badge = defineStyleConfig({
  baseStyle,
  defaultProps: {
  }
});

export default Badge;