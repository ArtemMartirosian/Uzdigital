import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
  table: {
    },
    thead: {
      bg: "lightGrey",
      border: "1px solid #DBE2E9",
      fontSize: "14px",
      Td: {
       fontWeight: "600", 
      }
      
    },
    th: {
      textTransform: "capitalize",
      fontWeight: "600",
      color: "#000 !important",
        
    },
    td: {
      border: "1px solid #DBE2E9",
      color: "black",
        
    },
    tbody:{
        
    },
    tfoot:{
        
    },
    tr:{
        
    },
    caption:{
        
    },
})

export const Table = defineMultiStyleConfig({ baseStyle })