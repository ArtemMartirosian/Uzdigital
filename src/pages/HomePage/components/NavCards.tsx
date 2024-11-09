import { SimpleGrid, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { CardIcon } from "../../../assets/icons/CardIcon";
import { ClipboardIcon } from "../../../assets/icons/ClipboardIcon";
import { MessageQuestionIcon } from "../../../assets/icons/MessageQuestionIcon";
import { SettingsIcon } from "../../../assets/icons/QuestionIcon";
import FavCards from "./FavCards";
import IDForm from "./IdForm";
import NavCard from "./NavCard";
import { useNavigate } from "react-router-dom";
import { mainPaths } from "../../../routes/paths/mainPaths";

const NavCards = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Stack spacing={4} pb={"60px"}>
      <SimpleGrid columns={2} spacing={4}>
        <NavCard
            onClick={() => {
                navigate(mainPaths.Autopayment);
            } }
          // soon
          title={t("home_page.auto_pay")}
          desc={t("home_page.auto_pay_desc")}
          icon={<CardIcon />}
        />
        <NavCard
          onClick={() => {
            navigate(mainPaths.Application);
          }}
          title={t("home_page.online_request")}
          desc={t("home_page.online_request_desc")}
          icon={<ClipboardIcon />}
        />
      </SimpleGrid>
      <IDForm />
      <FavCards />
      <SimpleGrid columns={2} spacing={4}>
        <NavCard
          onClick={() => {
            navigate(mainPaths.GetID);
          }}
          title={t("home_page.get_id")}
          desc={t("home_page.get_id_desc")}
          icon={<MessageQuestionIcon />}
        />
        <NavCard
          onClick={() => {
            navigate(mainPaths.Instructions);
          }}
          title={t("home_page.instructions")}
          desc={t("home_page.instructions_desc")}
          icon={<SettingsIcon />}
        />
      </SimpleGrid>
    </Stack>
  );
};

export default NavCards;
