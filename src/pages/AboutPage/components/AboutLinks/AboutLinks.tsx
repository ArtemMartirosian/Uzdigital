import { HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GPLogo } from "../../../../assets/icons/GPLogo";
import { GSLogo } from "../../../../assets/icons/GSLogo";
import { LinkItem } from "./LinkItem";

export const AboutLinks = () => {
  const { t } = useTranslation();

  return (
    <HStack gap="12px">
      <LinkItem
        logo={<GSLogo _dark={{ fill: "white" }} />}
        description={t("developed")}
        link="https://global.uz/"
      />
      <LinkItem
        logo={<GPLogo _dark={{ fill: "white" }} />}
        description={t("payments_via")}
        link="https://global.uz/global-pay/"
      />
    </HStack>
  );
};
