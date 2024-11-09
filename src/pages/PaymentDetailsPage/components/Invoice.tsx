import { HStack, List, ListItem, Text } from "@chakra-ui/layout";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { amountFormatter } from "../../../utils/amountFormatter";

export const Invoice = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const amount = location?.state?.amount;
  const account_id = location?.state?.account_id;
  const fio = location?.state?.fio;
  const balance = location?.state?.balance;
  const formattedAmount = amountFormatter(amount);

  return (
    <List
      bg="lightGrey"
      p="14px 16px"
      fontSize="16px"
      lineHeight="22px"
      borderRadius="16px"
      display="flex"
      flexDir="column"
      gap="14px"
      mb="30px"
    >
      <HStack as={ListItem} justifyContent="space-between">
        <Text as="span" color="mainGrey" flexBasis="50%">
          {t("account_id")}
        </Text>
        <Text as="span" flexBasis="50%" textAlign="right">
          {account_id}
        </Text>
      </HStack>
      <HStack as={ListItem} justifyContent="space-between">
        <Text as="span" color="mainGrey" flexBasis="50%">
          {t("payment_details_page.full_name")}
        </Text>
        <Text as="span" flexBasis="50%" textAlign="right">
          {fio}
        </Text>
      </HStack>
      <HStack as={ListItem} justifyContent="space-between">
        <Text as="span" color="mainGrey" flexBasis="50%">
          {t("payment_details_page.balance")}
        </Text>
        <Text as="span" flexBasis="50%" textAlign="right">
          {balance?.split(",")?.[0] || balance} UZS
        </Text>
      </HStack>
      <HStack as={ListItem} fontWeight={600} justifyContent="space-between">
        <Text as="span" color="mainGrey" flexBasis="50%">
          {t("payment_details_page.amount")}
        </Text>
        <Text as="span" color="buttonPurple" flexBasis="50%" textAlign="right">
          {formattedAmount} UZS
        </Text>
      </HStack>
    </List>
  );
};
