import { HStack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Clock } from "../../../assets/icons/Clock";
import { CloseCircle } from "../../../assets/icons/CloseCircle";
import { SettingsIconOutline } from "../../../assets/icons/SettingsIconOutline";
import { TickCircle } from "../../../assets/icons/TickCircle";
import { TimerIcon } from "../../../assets/icons/TimerIcon";
interface IStatusValueProps {
  status?: number | undefined;
}

const StatusValue: React.FC<IStatusValueProps> = ({ status }) => {
  const { t } = useTranslation();
  const getCurrentStatus = (status: number | undefined) => {
    switch (status) {
      case 100:
        return {
          icon: <TickCircle boxSize={"16px"} fontWeight={500} fill={"white"} />,
          text: t("closed"),
          bg: "#7CC296",
        };
      case 255:
        return {
          icon: (
            <CloseCircle boxSize={"16px"} fontWeight={500} fill={"white"} />
          ),
          text: t("rejected"),
          bg: "#E4899E",
        };
      case 1:
        return {
          icon: <Clock boxSize={"16px"} fontWeight={500} fill={"white"} />,
          text: t("in_process"),
          bg: "#F7AA47",
        };
      case 0:
        return {
          icon: <TimerIcon boxSize={"16px"} fontWeight={500} fill={"white"} />,
          text: t("on_waiting"),
          bg: "#B6BEC9",
        };
      case 10:
        return {
          icon: (
            <SettingsIconOutline
              boxSize={"16px"}
              fontWeight={500}
              fill={"white"}
            />
          ),
          text: t("in_work"),
          bg: "#8358FD",
        };
      default:
        return null;
    }
  };
  const currentStatus = getCurrentStatus(status);
  const text = currentStatus?.text;
  const icon = currentStatus?.icon;

  return (
    <HStack padding="4px 7px" borderRadius={"40px"} bg={currentStatus?.bg}>
      {icon}
      <Text fontWeight={500} color={"white"} fontSize={"sm"}>
        {text}
      </Text>
    </HStack>
  );
};

export default StatusValue;
