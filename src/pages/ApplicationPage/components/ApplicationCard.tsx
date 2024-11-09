import { Box, Center, Grid, HStack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { DocumentTextFilled } from "../../../assets/icons/DocumentTextFilled";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { formatPhoneNumber } from "../../../utils/FormatPhoneNumber";
import InfoBox from "./InfoBox";

export interface IApplicationCardProps {
  created_at: string;
  fio: string;
  phone_number: string;
  status: number;
  id: number;
  canManage?: boolean;
}

const ApplicationCard: React.FC<IApplicationCardProps> = ({
  created_at,
  fio,
  phone_number,
  id,
  status,
}) => {
  const { i18n } = useTranslation();

  dayjs.locale(i18n.language);
  const date = dayjs(created_at);
  const formattedDate = date.format("D MMM, HH:mm");

  return (
    <Grid
      as={Link}
      to={`${mainPaths.Application}/${id}`}
      cursor={"pointer"}
      gap={"18px"}
      minH={"148px"}
      p={3}
      borderRadius="18px"
      border="1px solid #DBE2E9"
      background=" #FFF"
      gridTemplateRows={"auto 1fr"}
    >
      <HStack>
        <Center bg="lightGrey" borderRadius="10px" p="9px">
          <DocumentTextFilled fill={"mainGrey"} />
        </Center>
        <Box>
          <Text fontWeight={600} color={"black"}>
            {fio}
          </Text>
          <Text color={"darkGrey"}>{formatPhoneNumber(phone_number)}</Text>
        </Box>
      </HStack>
      <Grid gridTemplateColumns={"1fr 1fr"} gap={2}>
        <InfoBox createdAt={formattedDate} />
        <InfoBox status={status} />
      </Grid>
    </Grid>
  );
};

export default ApplicationCard;
