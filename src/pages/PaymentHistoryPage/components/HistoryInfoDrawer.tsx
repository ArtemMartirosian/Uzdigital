import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Link,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Ipayment } from "../../../apis/PaymentApis/PaymentApis.types";
import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { ReceiptIcon } from "../../../assets/icons/ReceiptIcon";
import { FavouriteButton } from "../../../components/FavouriteButton/FavouriteButton";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import { THistoryItemType } from "../../../types/THistoryItemType";
import { DrawerInfoItem } from "./DrawerInfoItem";
import {
  useFavoriteCreateMutation,
  useFavoriteDeleteMutation,
} from "../../../apis/PaymentApis/PaymentApis.service";
import { useQueryClient } from "@tanstack/react-query";
import { PAYMENT_GET_ONE } from "../../../constants/queryKeys";

interface IHistoryInfoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Ipayment | undefined;
}

interface IHistoryInfo {
  title: string;
  value: string | Date;
  type: THistoryItemType;
}

export const HistoryInfoDrawer = ({
  isOpen,
  onClose,
  transaction,
}: IHistoryInfoDrawerProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const mockHistory: IHistoryInfo[] = [
    {
      title: "payment_history_page.check_number",
      value: String(transaction?.id),
      type: "ordinary",
    },
    // {
    //   title: "payment_history_page.type",
    //   value: transaction.type,
    //   type: "ordinary",
    // },
    {
      title: "account_id",
      value: transaction?.uzdigital_login || "",
      type: "ordinary",
    },
    {
      title: "payment_history_page.date",
      value: transaction?.created_at || "",
      type: "ordinary",
    },
    {
      title: "payment_history_page.status",
      value: String(transaction?.payment_status),
      type: "status",
    },
    // {
    //   title: "payment_history_page.payment_card",
    //   value: String(transaction?.card_number),
    //   type: "ordinary",
    // },
    {
      title: "amount",
      value: String(transaction?.amount),
      type: "amount",
    },
  ];

  const isFav = !!transaction?.favorite_transactions;

  const { mutate: deleteFavorite, isPending: isDeletingFavorite } =
    useFavoriteDeleteMutation();
  const { mutate: addToFavorite, isPending: isAddingFavorite } =
    useFavoriteCreateMutation();

  const onAddFavoriteClick = () => {
    if (isFav) {
      const favTransactionId = transaction?.favorite_transactions?.id;
      deleteFavorite(favTransactionId, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [PAYMENT_GET_ONE],
          });
        },
      });
    } else {
      addToFavorite(
        { transactionId: transaction?.id || 0 },
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
    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent borderRadius="24px 24px 0px 0px">
        <DrawerHeader>
          <HStack alignItems="center">
            <SectionTitle
              title={t("payment_history_page.receipt")}
              flexGrow={1}
              textAlign={"center"}
              pl="24px"
            />
            <CloseIcon onClick={onClose} as="button" cursor="pointer" />
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          {mockHistory.map(({ title, value, type }) => (
            <DrawerInfoItem
              key={title}
              title={title}
              value={value}
              type={type}
            />
          ))}
        </DrawerBody>

        <DrawerFooter mt="30px" gap="12px" pb="50px">
          <FavouriteButton
            isDisabled={isDeletingFavorite || isAddingFavorite}
            isFav={isFav}
            onClick={onAddFavoriteClick}
            flexBasis="50%"
          />
          <Button
            as={Link}
            color="activePurple"
            variant="secondary"
            flexGrow={1}
            leftIcon={<ReceiptIcon fill="activePurple" />}
            href={transaction?.gnk_fields || ""}
            target="_blank"
            flexBasis="50%"
          >
            {t("check")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
