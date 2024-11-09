import { Button, Spacer, VStack, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountIdInput } from "../../components/AccountIdInput/AccountIdInput";
import { AmountInput } from "../../components/AmountInput/AmountInput";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../routes/paths/mainPaths";
import { IBackendResponse } from "../../types/IBackendResponse.type";
import { IPaymentCreateResponse } from "../../apis/PaymentApis/PaymentApis.types";
import { usePaymentCreateMutation } from "../../apis/PaymentApis/PaymentApis.service";
import { ErrorModal } from "./components/FeedbackModal/ErrorModal";

export interface IIDForm {
  account_id: string;
  amount: string;
}

const IDFormPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    getValues,
  } = useForm<IIDForm>({
    defaultValues: {
      account_id: location?.state?.account_id || "",
      amount: location?.state?.amount || "",
    },
  });

  const onInvoiceGenerateSuccess = (
    data: IBackendResponse<IPaymentCreateResponse>
  ) => {
    const { link, id, fio, balance } = data.data;

    navigate(mainPaths.PaymentDetails, {
      state: {
        amount: getValues("amount"),
        account_id: getValues("account_id"),
        payment_id: id,
        link,
        fio,
        balance,
      },
    });
  };

  const { mutate: invoiceUrlGenerate, isPending: isInvoicePending } =
    usePaymentCreateMutation();

  const onPayment = () => {
    const body = {
      uzdigitalLogin: getValues("account_id"),
      amount: +getValues("amount"),
    };
    invoiceUrlGenerate(body, {
      onSuccess: onInvoiceGenerateSuccess,
      onError: () => onOpen(),
    });
  };

  const onSubmit = () => {
    onPayment();
  };

  return (
    <VStack py={5} pb={10} gap={0} h="full" alignItems="stretch">
      <SectionTitle title={t("id_form_page.title")} mb={6} />

      <form id="id-form" onSubmit={handleSubmit(onSubmit)}>
        <AccountIdInput errors={errors} register={register} />
        <AmountInput errors={errors} control={control} />
      </form>

      <Spacer />

      <Button
        form="id-form"
        w="full"
        type="submit"
        isDisabled={Object.keys(errors).length !== 0}
        isLoading={isInvoicePending}
      >
        {t("next")}
      </Button>
      <ErrorModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default IDFormPage;
