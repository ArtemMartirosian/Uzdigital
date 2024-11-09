import { Text } from "@chakra-ui/layout";
import {Button, Spacer,  VStack} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import { OTPInput } from "../../../components/OTPInput/OTPInput";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../../routes/paths/mainPaths";
import request from "../../../apis/config/axiosConfig.ts";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";
import {getCardData} from "../../../store/slices/userSlice.ts";
import {CodeTimer} from "../../OTPPage/components/CodeTimer.tsx";

export interface IOTPForm {
  otp: string;
  jwtToken: string;
  id: number;
}

const ApproveCard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state: RootState) => state?.user?.userData);
    const dispatch = useDispatch()
    const [countAttemps , setCountAttemps] = useState(3)
    const [error, setError] = useState<boolean>(false);




    const {state} = useLocation();


  const {
    handleSubmit,
    control,
      reset,
    formState: { errors },
  } = useForm<IOTPForm>({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: IOTPForm) => {
      setIsLoading(true)
      setError(false)

      try {
          await request.post(`/card/approve-payment-card/${user?.id}`, {
              cardToken : state?.cardToken,
              code : data?.otp
          });

          // @ts-ignore
          dispatch(getCardData(user.id))

          navigate(mainPaths.Cards, {
              state: {
                  cards: true,
                  success: true,
              },
          });
      } catch (error) {
          console.error("Error approving card:", error);
          setError(true)
          if(!countAttemps){
              navigate(mainPaths.Cards, {
                  state: {
                      cards: true,
                      error: true,
                  },
              });
          }

      } finally {
          setIsLoading(false)
      }



    // reset();
  };


    const sendAgain = async () => {
        setIsLoading(true)
        try {

            await request.post('/card/link-payment-card', {
                cardNumber: state?.cardNumber,
                expiryDate: state?.expiryDate,
            });
        } finally {
            setError(false)
            setIsLoading(false)
        }
        reset()
    }


    // if (isLoading)
    //     return (
    //         <Spinner
    //             thickness="6px"
    //             speed="0.5s"
    //             emptyColor="purple.200"
    //             color="activePurple"
    //             boxSize="50px"
    //             position="fixed"
    //             top="calc(50vh - 25px)"
    //             left="calc(50vw - 25px)"
    //             zIndex={10}
    //         />
    //     );

    return (
    <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
      <SectionTitle title={t("otp_page.title")} mb="26px" />
      <Text fontSize="16px" mb="22px">
        {t("otp_page.sent_to_number")}{" "}
        <Text as="span" color="activePurple" fontWeight={500}>
          {state?.smsNotificationNumber}
        </Text>
      </Text>

      <form id="otp-form" onSubmit={handleSubmit(onSubmit)}>
        <OTPInput control={control} errors={errors} isError={error}  />
      </form>

        {error && (
            <Text color="red.500" mt='-12px' mb="16px">
                {t("invalid_code")}
            </Text>
        )}

      <CodeTimer onClick={sendAgain} setAttemptsCount={setCountAttemps} />

      <Spacer />

      <Button
        form="otp-form"
        w="full"
        type="submit"
        isDisabled={Object.keys(errors).length !== 0}
        isLoading={isLoading}
      >
        {t("confirm")}
      </Button>
    </VStack>
  );
};

export default ApproveCard;
