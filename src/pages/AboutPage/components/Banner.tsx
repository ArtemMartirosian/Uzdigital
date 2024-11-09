import { Center, Img } from "@chakra-ui/react";
import logo from "../../../assets/images/logo.png";

const Banner = () => {
  return (
    <Center
      borderRadius="18px"
      minH="120px"
      w="full"
      bg="logoGradient"
    >
      <Img src={logo} alt="logo" w="283px" h={"70px"} />
    </Center>
  );
};

export default Banner;
