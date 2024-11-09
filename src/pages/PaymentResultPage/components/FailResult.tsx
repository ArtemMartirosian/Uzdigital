import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FailIllustration } from "../../../assets/icons/FailIllustration";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../../routes/paths/mainPaths";

export const FailResult = () => {
  const { t } = useTranslation();

  return (
    <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
      <FailIllustration alignSelf="center" mb={6} />

      <SectionTitle
        title={t("payment_result_page.successful_payment")}
        textAlign="center"
        mb={3}
      />

      <Text
        color="darkGrey"
        fontSize="16px"
        lineHeight="22px"
        textAlign="center"
      >
        {t("payment_result_page.try_again")}
      </Text>

      <Spacer />

      <HStack>
        <Button
          as={NavLink}
          state={{ initialTab: 2 }}
          to={mainPaths.About}
          replace
          variant="secondary"
          flexBasis="50%"
        >
          {t("support")}
        </Button>
        <Button
          as={NavLink}
          replace
          to={mainPaths.Home}
          variant="primary"
          flexBasis="50%"
        >
          {t("go_main_page")}
        </Button>
      </HStack>
    </VStack>
  );
};
