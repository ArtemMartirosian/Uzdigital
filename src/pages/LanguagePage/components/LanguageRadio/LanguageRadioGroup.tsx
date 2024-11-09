import { RadioGroup, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { appLanguages } from "../../../../constants/appLanguages.data";
import { TAppLanguage } from "../../../../types/appLanguages.type";
import { LanguageRadio } from "./LanguageRadio";
import { usePatchUserLanguage } from "../../../../apis/UsersApis/UserApis.service";

interface ILanguageRadioGroupProps {
  language: TAppLanguage;
  setLanguage: (value: TAppLanguage) => void;
  withRequest?: boolean;
}
export const LanguageRadioGroup = ({
  language,
  setLanguage,
  withRequest,
}: ILanguageRadioGroupProps) => {
  const { i18n } = useTranslation();

  const { mutate: changeUserLanguage } = usePatchUserLanguage();

  useEffect(() => {
    setLanguage(String(i18n.language) as TAppLanguage);
  }, [language]);

  const onLangChange = (value: TAppLanguage) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    withRequest && changeUserLanguage({ language: value });
  };

  return (
    <RadioGroup name="appLanguage" value={language} onChange={onLangChange}>
      <VStack spacing="10px">
        {appLanguages.map(({ id, name, icon }) => (
          <LanguageRadio key={id} id={id} value={id} icon={icon} name={name} />
        ))}
      </VStack>
    </RadioGroup>
  );
};
