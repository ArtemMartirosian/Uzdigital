import { defineStyle, defineStyleConfig } from "@chakra-ui/react";


const baseStyle = defineStyle({
    borderRadius: "16px",

});


const Progress = defineStyleConfig({
  baseStyle,
  defaultProps: {
  }
});

export default Progress;