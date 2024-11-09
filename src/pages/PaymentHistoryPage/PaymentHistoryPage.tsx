import { Spinner, VStack, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import Navbar from "../HomePage/components/Navbar";
import { HistoryInfoDrawer } from "./components/HistoryInfoDrawer";
import { HistoryItem } from "./components/HistoryItem";
import {
  usePaymentGetAllQuery,
  usePaymentGetOneQuery,
} from "../../apis/PaymentApis/PaymentApis.service";
import { Ipayment } from "../../apis/PaymentApis/PaymentApis.types";
import { useState } from "react";
import { EmptyHistory } from "./components/EmptyHistory";

const PaymentHistoryPage = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTransactionId, setCurrentTransactionId] = useState("");

  const { data } = usePaymentGetAllQuery({ params: {} });

  const { data: currentTransaction, isLoading } = usePaymentGetOneQuery({
    id: String(currentTransactionId),
    queryOptions: {},
  });

  const onTransactionCardClick = (transaction: Ipayment) => {
    onOpen();
    setCurrentTransactionId(String(transaction.id));
  };

  if (isLoading) return <Spinner />;

  return (
    <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
      <SectionTitle title={t("payment_history_page.title")} mb="22px" />
      {
        <VStack gap="14px" pb="100px">
          {data?.data?.length === 0 ? (
            <EmptyHistory />
          ) : (
            data?.data.map((item: Ipayment, index: number) => (
              <HistoryItem
                key={index}
                accountId={item.uzdigital_login}
                amount={String(item.amount)}
                date={new Date(item.created_at)}
                onClick={() => onTransactionCardClick(item)}
              />
            ))
          )}
        </VStack>
      }
      <HistoryInfoDrawer
        transaction={currentTransaction?.data}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Navbar />
    </VStack>
  );
};

export default PaymentHistoryPage;
