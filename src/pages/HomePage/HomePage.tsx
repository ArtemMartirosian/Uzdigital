import { Box } from "@chakra-ui/react";
import Banner from "./components/Banner";
import NavCards from "./components/NavCards";
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <Box py="20px">
      <Banner />
      <NavCards />
      <Navbar />
    </Box>
  );
};

export default HomePage;
