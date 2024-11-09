import { useTranslation } from "react-i18next";
import { appLanguages } from "../constants/appLanguages.data";

export const useCurrentLanguage = () => {
  const { i18n } = useTranslation();

  return appLanguages.find(({ id }) => id === i18n.language);
};
