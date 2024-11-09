import { Box, Img, SlideFade } from "@chakra-ui/react";
import logo from "../../assets/images/logo.png";
import AnimatedBg from "./components/AnimatedBg";
import LanguageBox from "./components/LanguageBox";

const LanguagePage = () => {
  return (
    <Box overflow="hidden" position="relative" h="100vh">
      <AnimatedBg />
      <Img
        position="absolute"
        top="100px"
        left="50%"
        transform="translate(-50%, -50%)"
        src={logo}
        w="233px"
        h="51px"
        alt="logo"
        pos="relative"
        animation="logo 3s linear"
      />
      <SlideFade in>
        <LanguageBox />
      </SlideFade>
    </Box>
  );
};

export default LanguagePage;
