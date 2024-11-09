import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddCircle } from "../../assets/icons/AddCircle";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../routes/paths/mainPaths";
import ApplicationsList from "./components/ApplicationsList";
import { MessageModal } from "./components/MessageModal/MessageModal";
import { useTranslation } from "react-i18next";

const ApplicationPage = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const applicationCreated = localStorage.getItem("applicationCreated");
  const isSucess = JSON.parse(String(applicationCreated));

  useEffect(() => {
    if (applicationCreated) {
      setIsOpen(true);
    }
  });

  return (
    <>
      <HStack pt={"22px"} mb={"20px"} justifyContent={"space-between"}>
        <SectionTitle title={t("online_request")} />
        <Link to={mainPaths.ApplicationForm}>
          <AddCircle cursor={"pointer"} />
        </Link>
      </HStack>
      <ApplicationsList />
      <MessageModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          localStorage.removeItem("applicationCreated");
        }}
        title={isSucess ? t("thanks") : t("mistake")}
        subtitle={isSucess ? t("app_success_subtitle") : t("sub_mistake")}
        isSuccess={isSucess}
      />
    </>
  );
};

export default ApplicationPage;
