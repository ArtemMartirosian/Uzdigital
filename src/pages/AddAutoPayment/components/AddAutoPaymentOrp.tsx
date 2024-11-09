import { Text } from "@chakra-ui/layout";
import { Button, Spacer, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import { OTPInput } from "../../../components/OTPInput/OTPInput";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import { mainPaths } from "../../../routes/paths/mainPaths";
import request from "../../../apis/config/axiosConfig.ts";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {CodeTimer} from "../../OTPPage/components/CodeTimer.tsx";
import {formatPhoneNumber} from "../../../utils/FormatPhoneNumber.ts";
import {getCardData} from "../../../store/slices/userSlice.ts";

export interface IOTPForm {
  otp: string;
  jwtToken: string;
  telegram_chat_id: string | undefined;
}

const AddAutoPaymentOtp = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading , setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [countAttemps , setCountAttemps] = useState(3)
    const dispatch = useDispatch();
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
        setError(false)
        setLoading(true)
        try {
            const schedulePaymentPayload = {
                userId: state.userId,
                tokenId:+ state.tokenId ,
                uzDigitalAccountId: state.uzDigitalAccountId,
                amount: state.amount,
                isActive: true,
                day: new Date().getDate(),
                month: new Date().getMonth() + 1,
                otp: data.otp,
                phone: state.phoneNumber,

            };
            await request.post(
                '/uzdigital/schedule/payment',
                schedulePaymentPayload
            );
            // @ts-ignore
            dispatch(getCardData(state.userId))
                navigate(mainPaths.Autopayment , {state : {success : true}})

        } catch (error) {
            setError(true)
                if(!countAttemps){
                    navigate(mainPaths.Autopayment , {state : {error : true}})
                }
        } finally {
            setLoading(false)
        }
    };

    const sendAgain = async () => {
        setLoading(true)
        setError(false)
        reset()
        try {
            await request.post('/otp/send', { phoneNumber: state.phoneNumber }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
        } catch (error) {
            console.error('Failed to resend OTP:', error);
        } finally {
            setLoading(false)
        }
    }

  return (
    <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
      <SectionTitle title={t("otp_page.title")} mb="26px" />
      <Text fontSize="16px" mb="22px">
        {t("otp_page.sent_to_number")}{" "}
        <Text as="span" color="activePurple" fontWeight={500}>
            {formatPhoneNumber(state.phoneNumber)}
        </Text>
      </Text>

      <form id="otp-form" onSubmit={handleSubmit(onSubmit)}>
        <OTPInput control={control} errors={errors} />
      </form>
        {error && (
            <Text color="red.500" fontSize='16px' mb="16px">
                {t("invalid_code")}
            </Text>
        )}

      <CodeTimer onClick={sendAgain} setAttemptsCount={setCountAttemps} />

      <Spacer />

      <Button
        form="otp-form"
        w="full"
        type="submit"
        isLoading={loading}
        isDisabled={Object.keys(errors).length !== 0}
      >
        {t("confirm")}
      </Button>
    </VStack>
  );
};

export default AddAutoPaymentOtp;
