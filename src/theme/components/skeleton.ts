import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  borderRadius: "12px",
  startColor: "#EAECF0",
  endColor: "#F9FAFB",
  colorScheme: "gray",
});

const Skeleton = defineStyleConfig({
  baseStyle,
});

export default Skeleton;
