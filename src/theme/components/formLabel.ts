import { defineStyle, defineStyleConfig } from "@chakra-ui/react";


const baseStyle = defineStyle({
 fontWeight: "600", 
});


  const FormLabel = defineStyleConfig({
    baseStyle,
    defaultProps: {
      variant:"unstyled"
    }
  });

  export default FormLabel;