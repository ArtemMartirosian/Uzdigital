import { Link, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { WalletIllustration } from "../../../assets/icons/WalletIllustration";

export const EmptyHistory = () => {
  const { t } = useTranslation();

  return (
    <VStack
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <WalletIllustration />
      <Text mb="8px" color="darkGrey">
        {t("payment_history_page.empty")}
      </Text>
      <Link
        as={RouterLink}
        to={mainPaths.IDForm}
        cursor="pointer"
        color="activePurple"
        fontWeight={700}
      >
        {t("payment_history_page.top_up")}
      </Link>
    </VStack>
  );
};
