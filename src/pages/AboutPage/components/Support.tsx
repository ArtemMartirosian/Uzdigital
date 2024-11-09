import { HStack } from "@chakra-ui/react";
import InfoCard from "./InfoCard";
import { Phone } from "../../../assets/icons/Phone";
import { EMail } from "../../../assets/icons/EMail";
import { SupportForm } from "./SupportForm/SupportForm";
import { useTranslation } from "react-i18next";
import { useContactsGetAllQuery } from "../../../apis/Contacts.sevice";

const Support = () => {
  const { t } = useTranslation();
  const { data: contacts } = useContactsGetAllQuery();
  const contactsList = contacts?.data;

  return (
    <>
      <HStack mb={"30px"} overflow={"auto"} className="no-scrollbar">
        {contactsList?.map((item) => (
          <InfoCard
            variant={item.type === 1 ? "tel" : "mail"}
            icon={item.type === 1 ? <Phone /> : <EMail />}
            label={t(item.type === 1 ? "phone" : "email")}
            info={item.value}
          />
        ))}
      </HStack>
      <SupportForm />
    </>
  );
};

export default Support;
