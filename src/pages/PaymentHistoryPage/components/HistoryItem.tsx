import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { CardIcon } from "../../../assets/icons/CardIcon";
import { amountFormatter } from "../../../utils/amountFormatter";

interface IHistoryItemProps {
  accountId: string;
  amount: string;
  date: Date;
  onClick: () => void;
}

export const HistoryItem = ({
  accountId,
  amount,
  date,
  onClick,
}: IHistoryItemProps) => {
  const formattedDate = dayjs(date).format("DD.MM.YYYY");
  const formattedTime = dayjs(date).format("HH:mm");
  const formattedAmount = amountFormatter(Number(amount));

  return (
    <HStack
      justifyContent="space-between"
      bg="lightGrey"
      p="12px 14px"
      borderRadius="16px"
      w="full"
      onClick={onClick}
      cursor="pointer"
      fontSize="15px"
    >
      <HStack>
        <Flex
          justifyContent="center"
          alignItems="center"
          p="9px"
          bg="white"
          borderRadius="10px"
        >
          <CardIcon />
        </Flex>
        <Box>
          <Text lineHeight="20px">ID: {accountId}</Text>
          <Text lineHeight="22px" fontWeight={600} color="buttonPurple">
            {formattedAmount} UZS
          </Text>
        </Box>
      </HStack>
      <Box textAlign="right" lineHeight="20px" color="darkGrey">
        <Text fontWeight={500}>{formattedDate}</Text>
        <Text>{formattedTime}</Text>
      </Box>
    </HStack>
  );
};
