import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ICheckAccountIDResponse } from "../../../../../apis/CheckAccountIdByCDSN.service";
import { DocumentTextFilled } from "../../../../../assets/icons/DocumentTextFilled";
import { addClipboard } from "../../../../../utils/addClipboard";

const IdDataBox = ({
  IdData,
  onClose,
}: {
  onClose: () => void;
  IdData: ICheckAccountIDResponse;
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Heading mb="3px" fontSize="16px">
        {t("your_id")}
      </Heading>
      <Box mb={5} borderRadius="16px" bg="lightGrey" p="14px 16px">
        <HStack mb={"14px"}>
          <Center bg="white" borderRadius="10px" p="9px">
            <DocumentTextFilled fill={"mainGrey"} />
          </Center>
          <Box>
            <Text color={"darkGrey"}> {t("id_number")}</Text>
            <Text fontWeight={600} color={"black"}>
              {IdData?.client_id}
            </Text>
          </Box>
          <Box
            justifySelf={"flex-end"}
            flexGrow={1}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              addClipboard(IdData?.client_id);
            }}
          >
            <CopyIcon />
          </Box>
        </HStack>
        <Stack>
          <HStack justifyContent={"space-between"}>
            <Text color={"mainGrey"} fontSize={"16px"}>
              {t("status")}
            </Text>
            <Text fontSize={"16px"}>{IdData?.status}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text color={"mainGrey"} fontSize={"16px"}>
              {t("tariff")}
            </Text>
            <Text fontSize={"16px"}>{IdData?.package}</Text>
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text color={"mainGrey"} fontSize={"16px"}>
              {t("payment_details_page.balance")}
            </Text>
            <Text fontSize={"16px"}>{IdData?.balance}</Text>
          </HStack>
        </Stack>
      </Box>
      <Button width={"100%"} onClick={onClose}>
        {t("thanks")}
      </Button>
    </Box>
  );
};

export default IdDataBox;
