import {
  Button,
  HStack,
  Link,
  List,
  ListItem,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { ReceiptIcon } from "../../../assets/icons/ReceiptIcon";
import { SuccessIllustration } from "../../../assets/icons/SuccessIllustration";
import { FavouriteButton } from "../../../components/FavouriteButton/FavouriteButton";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { amountFormatter } from "../../../utils/amountFormatter";
import {
  useFavoriteCreateMutation,
  useFavoriteDeleteMutation,
  usePaymentGetOneQuery,
} from "../../../apis/PaymentApis/PaymentApis.service";
import { useQueryClient } from "@tanstack/react-query";
import { PAYMENT_GET_ONE } from "../../../constants/queryKeys";

export const SuccessResult = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const {
    state: { amount, account_id, payment_id },
  } = useLocation();

  const { data: payment } = usePaymentGetOneQuery({
    id: String(payment_id),
    queryOptions: {},
  });
  const isFav = payment?.data?.favorite_transactions;

  const { mutate: deleteFavorite, isPending: isDeletingFavorite } =
    useFavoriteDeleteMutation();
  const { mutate: addToFavorite, isPending: isAddingFavorite } =
    useFavoriteCreateMutation();

  const onFavoriteClick = () => {
    if (isFav) {
      const transactionId = payment?.data?.favorite_transactions?.id;
      deleteFavorite(+transactionId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [PAYMENT_GET_ONE],
          });
        },
      });
    } else {
      const transactionId = payment?.data?.id ?? 1;
      addToFavorite(
        { transactionId: +transactionId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [PAYMENT_GET_ONE],
            });
          },
        }
      );
    }
  };
  return (
    <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
      <SuccessIllustration alignSelf="center" mb={6} />

      <SectionTitle
        title={t("payment_result_page.successful_payment")}
        textAlign="center"
        mb={5}
      />

      <List
        bg="lightGrey"
        p="14px 16px"
        fontSize="16px"
        lineHeight="22px"
        borderRadius="16px"
        display="flex"
        flexDir="column"
        gap="14px"
        mb="18px"
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
            {t("amount")}
          </Text>
          <Text as="span" flexBasis="50%" textAlign="right">
            {amountFormatter(amount)}
          </Text>
        </HStack>
      </List>

      <HStack
        as={Link}
        href={payment?.data?.gnk_fields || ""}
        target="_blank"
        gap="5px"
        alignItems="center"
        justifyContent="center"
        color="activePurple"
        fontSize="15px"
      >
        <ReceiptIcon fill="activePurple" />
        <Text as="span">{t("fiscal_check")}</Text>
      </HStack>

      <Spacer />

      <HStack>
        <FavouriteButton
          isLoading={isDeletingFavorite || isAddingFavorite}
          isFav={!!isFav}
          onClick={onFavoriteClick}
          flexBasis="50%"
        />
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
