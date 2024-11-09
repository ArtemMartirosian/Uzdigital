import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useGetApplicationById } from "../../apis/ApplicationApis/ApplicationApis.service";
import { DocumentTextFilled } from "../../assets/icons/DocumentTextFilled";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../routes/paths/mainPaths";
import { formatPhoneNumber } from "../../utils/FormatPhoneNumber";
import StatusValue from "./components/StatusValue";

const ApplicationIDPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const { data } = useGetApplicationById(id || "");

  const application = data?.data;

  dayjs.locale(i18n.language);
  const date = dayjs(application?.created_at);
  const formattedDate = date.format("D MMM, HH:mm");

  const details = [
    {
      label: t("sent"),
      value: formattedDate,
      type: "ordinary",
    },
    {
      label: t("region"),
      value: application?.region,
      type: "ordinary",
    },
    {
      label: t("district"),
      value: application?.district,
      type: "ordinary",
    },
    {
      label: t("address"),
      value: application?.address,
      type: "ordinary",
    },
    {
      label: t("status"),
      value: application?.status,
      type: "status",
    },
  ];

  return (
    <Grid pb={"10px"} minH={"100vh"} gridTemplateRows={"auto auto 1fr "}>
      <SectionTitle my={5} title={t("your_application")} />
      {application && (
        <>
          <Box p={4} borderRadius="16px" background="lightGrey">
            <HStack mb={"14px"}>
              <Center bg="white" borderRadius="10px" p="9px">
                <DocumentTextFilled fill={"mainGrey"} />
              </Center>
              <Box>
                <Text fontWeight={600} color={"black"}>
                  {application?.fio}
                </Text>
                <Text color={"darkGrey"}>
                  {formatPhoneNumber(application?.phone_number)}
                </Text>
              </Box>
            </HStack>
            <Stack>
              {details.map((item) => (
                <HStack justifyContent={"space-between"}>
                  <Text fontSize={"md"} color={"mainGrey"}>
                    {item.label}
                  </Text>
                  {item.type === "status" ? (
                    <StatusValue status={application?.status} />
                  ) : (
                    <Text fontSize={"md"}>{item.value}</Text>
                  )}
                </HStack>
              ))}
            </Stack>
          </Box>
          <Button
            as={Link}
            to={mainPaths.ApplicationForm}
            alignSelf={"end"}
            w="100%"
            loadingText={<Spinner />}
          >
            {t("send_again")}
          </Button>
        </>
      )}
    </Grid>
  );
};

export default ApplicationIDPage;
