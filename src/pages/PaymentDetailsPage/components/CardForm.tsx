import { Button, Spacer, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import useTelegram from "../../../hooks/useTelegram";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { useState } from "react";

export interface ICardForm {
  card_number: string;
  expiration: string;
}

export const CardForm = () => {
  const { tg } = useTelegram();
  const { t } = useTranslation();
  const [iseLoading, setIsLoading] = useState(false);
  const {
    state: { amount, account_id },
    state,
  } = useLocation();
  const navigate = useNavigate();

  // !! DONT Remove it !!
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  //   reset,
  // } = useForm<ICardForm>({
  //   defaultValues: {
  //     card_number: "",
  //     expiration: "",
  //   },
  // });

  // const onSubmit = (data: ICardForm) => {
  //   console.log("data", data);

  //   navigate(mainPaths.OTP);

  //   reset();
  // };

  const onPayment = () => {
    const { link, payment_id } = state;

    setIsLoading(true);

    tg.openInvoice(link, (status) => {
      const state = { status, account_id, amount, payment_id };

      setIsLoading(false);

      switch (status) {
        case "failed":
        case "paid": {
          navigate(mainPaths.PaymentResult, { state });
          break;
        }
        default: {
          break;
        }
      }
    });
  };

  return (
    <VStack h="full" alignItems="stretch">
      {/*  !! DONT Remove it 
       <form id="card-form" onSubmit={handleSubmit(onSubmit)}>
        <CardNumberInput errors={errors} control={control} />
        <ExpirationInput errors={errors} control={control} />
      </form> */}
      <Spacer />
      <Button
        form="card-form"
        w="full"
        type="submit"
        onClick={onPayment}
        isLoading={iseLoading}
        // !! DONT Remove it
        // isDisabled={Object.keys(errors).length !== 0}
      >
        {t("pay")}
      </Button>
    </VStack>
  );
};
