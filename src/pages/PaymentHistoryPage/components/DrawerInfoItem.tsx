import { HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { THistoryItemType } from "../../../types/THistoryItemType";
import { statusColors } from "../../../constants/statusColors";
import { amountFormatter } from "../../../utils/amountFormatter";

interface IDrawerInfoItemProps {
  title: string;
  value: string | Date;
  type: THistoryItemType;
}

export const DrawerInfoItem = ({
  title,
  value,
  type,
}: IDrawerInfoItemProps) => {
  const { t } = useTranslation();

  return (
    <HStack
      py="14px"
      borderBottomWidth="1px"
      borderColor="#E8EEF7"
      fontSize="16px"
      lineHeight="20px"
      justifyContent="space-between"
    >
      <Text color="darkGrey">{t(title)}</Text>
      <Text
        color={type === "status" ? statusColors[String(value)] : "black"}
        fontWeight={type === "amount" ? 700 : 400}
      >
        {value instanceof Date
          ? dayjs(value).format("DD.MM.YYYY, HH:mm")
          : type === "status"
          ? t(`statuses.${value}`)
          : type === "amount"
          ? amountFormatter(Number(value)) + " UZS"
          : value}
      </Text>
    </HStack>
  );
};
