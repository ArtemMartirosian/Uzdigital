import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  padding: "8px 12px",
  fontSize: "12px",
  lineHeight: "18px",
  borderRadius: "8px",
  fontWeight: "500",
  color: "#fff",
  backgroundColor: "#000",
});

const Tooltip = defineStyleConfig({ baseStyle });

export default Tooltip;
