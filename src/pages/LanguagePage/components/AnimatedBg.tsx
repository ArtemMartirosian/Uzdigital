import { Box } from "@chakra-ui/react";

const AnimatedBg = () => {
  return (
    <Box
      background="gradient"
      position="absolute"
      top={0}
      left={0}
      w="full"
      h="full"
      animation="gradient 8s linear infinite"
    />
  );
};

export default AnimatedBg;
