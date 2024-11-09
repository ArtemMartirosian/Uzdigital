import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys)

  const secondary = definePartsStyle({
    container: {
    height: "36px",
    px: 3,
    borderRadius: "10px",
    background: "#F0F3FA",
    _dark:{bg: "black.400" }
  },
})

const primary = definePartsStyle({
  container: {
    borderRadius: "100px",
    background: "#F0F3FA",
    minH: "40px",
    px: "18px",
    cursor: "pointer",
    color: "gray.500",
    bg: "#F0F3FA",
    whiteSpace: "nowrap",
    width: "max-content",
    flexShrink: 0,
    _dark: {
      bg: "black.400",
    }
  },
})

export const Tag = defineMultiStyleConfig({

  variants: { secondary, primary }
})