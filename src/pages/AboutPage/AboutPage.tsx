import { Stack } from "@chakra-ui/react";
import Banner from "./components/Banner";
import ContentTabs from "./components/ContentTabs";

const AboutPage = () => {
  return (
    <Stack h={"100%"} spacing="18px" py="16px">
      <Banner />
      <ContentTabs />
    </Stack>
  );
};

export default AboutPage;
