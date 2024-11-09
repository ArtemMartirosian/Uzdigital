import { Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Flex bg="red" justifyContent="center" alignItems="center" h="100vh">
      <Heading
        textAlign="center"
        fontSize="28px"
        fontWeight="700"
        color="text"
        _dark={{ color: "white" }}
      >
        {t("unknown_error")}
      </Heading>
    </Flex>
  );
};
