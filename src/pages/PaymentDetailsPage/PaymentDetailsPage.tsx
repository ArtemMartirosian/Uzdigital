import { VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { CardForm } from "./components/CardForm";
import { Invoice } from "./components/Invoice";

const PaymentDetailsPage = () => {
  const { t } = useTranslation();

  return (
    <VStack pt={5} pb={10} gap={0} h="full" alignItems="stretch">
      <SectionTitle title={t("payment_details_page.title")} mb="14px" />
      <Invoice />
      <CardForm />
    </VStack>
  );
};

export default PaymentDetailsPage;
