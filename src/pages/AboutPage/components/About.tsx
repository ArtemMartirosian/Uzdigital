import { Grid, GridItem, Text } from "@chakra-ui/react";
import { AboutLinks } from "./AboutLinks/AboutLinks";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <Grid h="100%" gridTemplateRows="1fr auto" pb="10px">
      <GridItem>
        <Text display={"inline"} color={"buttonPurple"} fontWeight={600}>
          {t("UzDigital_bot")}
        </Text>
        <Text display={"inline"}>{t("UzDigital_bot_desc")}</Text>
      </GridItem>
      <GridItem>
        <AboutLinks />
      </GridItem>
    </Grid>
  );
};

export default About;
