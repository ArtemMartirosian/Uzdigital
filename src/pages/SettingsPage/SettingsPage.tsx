import { Heading, Stack } from "@chakra-ui/react";
import Navbar from "../HomePage/components/Navbar";
import Option from "./components/Options";
import { useTranslation } from "react-i18next";
import { Question } from "../../assets/icons/Question";
// import { DocumentText } from "../../assets/icons/DocumentText";
import { useNavigate } from "react-router-dom";
import { mainPaths } from "../../routes/paths/mainPaths";
import LanguageDrawer from "./components/LanguageDrawer";

const SettingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onAboutServiceOptionClick = () => {
    navigate(mainPaths.About);
  };

  return (
    <>
      <Heading fontSize={"20px"} fontWeight={"600"} mt={5} mb={4}>
        {t("settings")}
      </Heading>
      <Stack spacing={0}>
        <LanguageDrawer />
        <Option
          onClick={onAboutServiceOptionClick}
          icon={<Question />}
          title={t("about_service")}
          bordered
        />
        {/* <Option icon={<DocumentText />} title={t("offert")} disabled /> */}
      </Stack>
      <Navbar />
    </>
  );
};
export default SettingsPage;
