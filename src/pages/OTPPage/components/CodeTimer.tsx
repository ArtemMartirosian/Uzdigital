import { HStack, Text } from "@chakra-ui/react";
import { t } from "i18next";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
import { ResendIcon } from "../../../assets/icons/ResendIcon";

interface CodeTimerProps {
  onClick?: () => void;
  setAttemptsCount?: (attempts: number) => void; // Function to update attempts count
}

export const CodeTimer = ({ onClick, setAttemptsCount }: CodeTimerProps): JSX.Element | null => {
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const [attempts, setAttempts] = useState(3);

  const now = new Date();
  const timerTarget = new Date(now.getTime() + 1 * 60 * 1000);



  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: timerTarget,
    onExpire: () => setIsTimerExpired(true),
  });


  const clickHandler = () => {
    if (onClick) {
      onClick();
    }
    if(setAttemptsCount){
      setAttemptsCount(attempts - 1)
    }
    setAttempts((prev) => prev - 1);
    setIsTimerExpired(false);
    restart(timerTarget);
  };

  if (isTimerExpired) {
    if(!attempts) {
      return null
    }
    return (
      <HStack justifyContent="space-between">
        <HStack gap="4px" alignItems="center">
          <ResendIcon />
          <Text
            as="button"
            color="activePurple"
            fontWeight={500}
            fontSize="15px"
            _hover={{ textDecoration: "underline" }}
            onClick={clickHandler}
          >
            {t("otp_page.get_new_code")}
          </Text>
        </HStack>
        <Text>
          {t("otp_page.attempts")} {attempts}
        </Text>
      </HStack>
    );
  }

  return (
    <Text fontSize="16px" color="darkGrey">
      {t("otp_page.new_code_in")} {minutes > 9 ? minutes : `0${minutes}`}:
      {seconds > 9 ? seconds : `0${seconds}`}
    </Text>
  );
};
