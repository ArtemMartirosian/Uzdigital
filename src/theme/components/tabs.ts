import { defineStyle, defineStyleConfig } from "@chakra-ui/react";


const baseStyle = defineStyle({
  tab: {
    flexGrow: 1,
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "center",
    transition: "0.3s",
    minH: "44px",
    color:"mainGrey",
    _selected:{
      bg: "white",
      color: "black",
      transition: "0s",
      _hover:{
     
      }
    },
    _hover: {
      
    },
    _active: {
      color:"black"
      
    },
  
  },
  tablist: {
    gap: "8px",
    bg: "lightGrey",
    p: "3px",
    borderRadius:"14px"
  },
  tabPanel: {
    p:0
  }
  

});


  const Tabs = defineStyleConfig({
    baseStyle,
    defaultProps: {
      variant:"unstyled"
    }
  });

  export default Tabs;