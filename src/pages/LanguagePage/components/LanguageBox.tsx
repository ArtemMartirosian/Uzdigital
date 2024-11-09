import { Heading, Button, Spinner, Box } from "@chakra-ui/react";
import { LanguageRadioGroup } from "./LanguageRadio/LanguageRadioGroup";
import { useNavigate } from "react-router-dom";
import { TAppLanguage } from "../../../types/appLanguages.type";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { usePatchUserLanguage } from "../../../apis/UsersApis/UserApis.service";

const LanguageBox = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [language, setLanguage] = useState<TAppLanguage>("uz");
  const { mutate, isPending } = usePatchUserLanguage();

  const onContinue = () => {
    mutate(
      { language },
      {
        onSuccess: () => {
          navigate(mainPaths.Home, { replace: true });
        },
      }
    );
  };


  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <Box
      animation="languageBox 3s linear"
      transform-origin="bottom center"
      position="absolute"
      bottom={0}
      opacity={1}
      w="full"
      p="22px 16px"
      borderRadius="22px 22px 0px 0px"
      boxShadow="0px 4px 10px 0px rgba(18, 31, 62, 0.06)"
      bg="white"
    >
      <Heading fontWeight={600} fontSize="20px" textAlign="center" mb="23px">
        {t("welcome")}
      </Heading>
      <Box mb="50px">
        <LanguageRadioGroup
          withRequest={false}
          language={language}
          setLanguage={setLanguage}
        />
      </Box>
      <Button
        w="100%"
        onClick={onContinue}
        isDisabled={isPending}
        loadingText={<Spinner />}
      >
        {t("begin")}
      </Button>
    </Box>
  );
};
export default LanguageBox;
