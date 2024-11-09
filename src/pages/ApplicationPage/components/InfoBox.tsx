import { Grid, Text } from "@chakra-ui/react";
import { DirectBoxSend } from "../../../assets/icons/DirectBoxSend";
import { CloseCircle } from "../../../assets/icons/CloseCircle";
import { TickCircle } from "../../../assets/icons/TickCircle";
import { Clock } from "../../../assets/icons/Clock";
import { useTranslation } from "react-i18next";
import { TimerIcon } from "../../../assets/icons/TimerIcon";
import { SettingsIconOutline } from "../../../assets/icons/SettingsIconOutline";

interface IInfoBoxProps {
  createdAt?: string;
  status?: number;
}

const InfoBox: React.FC<IInfoBoxProps> = ({ createdAt, status }) => {
  const { t } = useTranslation();
  const getCurrentStatus = (status: number | undefined) => {
    switch (status) {
      case 100:
        return {
          icon: <TickCircle boxSize={"24px"} fontWeight={500} />,
          text: t("closed"),
          bg: "#E6F6EC",
        };
      case 255:
        return {
          icon: <CloseCircle boxSize={"24px"} fontWeight={500} />,
          text: t("rejected"),
          bg: "#FCF1F3",
        };
      case 1:
        return {
          icon: <Clock boxSize={"24px"} fontWeight={500} />,
          text: t("in_process"),
          bg: "#FFF3E4",
        };
      case 0:
        return {
          icon: <TimerIcon boxSize={"24px"} fontWeight={500} />,
          text: t("on_waiting"),
          bg: "#F3F6FF",
        };
      case 10:
        return {
          icon: <SettingsIconOutline boxSize={"24px"} fontWeight={500} />,
          text: t("in_work"),
          bg: "#F6F4FD",
        };
      default:
        return null;
    }
  };
  const currentStatus = getCurrentStatus(status);
  const text = createdAt || currentStatus?.text;

  const icon = currentStatus?.icon || <DirectBoxSend />;

  const bg = currentStatus?.bg || "#F6F4FD";

  return (
    <Grid
      gap={1}
      alignItems={"center"}
      justifyItems={"center"}
      borderRadius={"10px"}
      p={"8px 10px"}
      flex={"1 1 50%"}
      bg={bg}
    >
      {icon}
      <Text fontWeight={500}>{text}</Text>
    </Grid>
  );
};

export default InfoBox;
