import { Text } from "@chakra-ui/layout";
import { Button, Spacer, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import { OTPInput } from "../../components/OTPInput/OTPInput";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { CodeTimer } from "./components/CodeTimer";
import request from "../../apis/config/axiosConfig.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {useEffect, useState} from "react";

export interface IOTPForm {
  otp: string;
  jwtToken: string;
  telegram_chat_id: string | undefined;
}

const OTPPage = () => {
    const { t } = useTranslation();
    const [error, setError] = useState<boolean>(false);
    const {state} = useLocation();
    const user = useSelector((state: RootState) => state?.user?.userData);
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Check if the token exists in localStorage
        if (window.localStorage.getItem("token")) {
            navigate("/");
        }
    }, [navigate]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IOTPForm>({
    defaultValues: {
      otp: "",
    },

  });

    const formatPhoneNumber = (phoneNumber : string) => {
        const countryCode = phoneNumber?.slice(0, 4);

        const areaCode = phoneNumber?.slice(4, 6);
        const lastPart = phoneNumber?.slice(11);

        return `${countryCode} (${areaCode}) **** ${lastPart}`;
    };

    async function login(tgUserId: number, phone: string, otp: string) {

        setError(false)
        setLoading(true)
        try {
            const payload = {
                tg_chat_id : tgUserId,
                phone,
                otp,
            };
            const response = await request.post('/auth/login', payload);
            const jwtToken = response;

            // @ts-ignore
            localStorage.setItem("token" , jwtToken)

            // navigate(mainPaths.Account)
            window.location.href = "/account"
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (data: IOTPForm) => {
        const tgUserId = user?.telegram_chat_id ? Number(user.telegram_chat_id) : undefined;
        if (tgUserId === undefined) {
            return;
        }
        await login(tgUserId, state?.phoneNumber, data.otp)

        reset();
    };

    const sendAgain = async () => {
        try {
            await request.post('/otp/send', { phoneNumber: state.phoneNumber }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // This ensures credentials like cookies are sent
            });
        } catch (error) {
            console.error('Failed to resend OTP:', error);
        }
    }

  return (
    <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
      <SectionTitle title={t("otp_page.title")} mb="26px" />
      <Text fontSize="16px" mb="22px">
        {t("otp_page.sent_to_number")}{" "}
        <Text as="span" color="activePurple" fontWeight={500}>
            {formatPhoneNumber(state?.phoneNumber)}
        </Text>
      </Text>

      <form id="otp-form" onSubmit={handleSubmit(onSubmit)}>
        <OTPInput control={control} errors={errors} isError={error} />
      </form>
        {error && (
            <Text color="red.500" mt='-12px' mb="16px">
                {t("invalid_code")}
            </Text>
        )}

      <CodeTimer onClick={sendAgain} />

      <Spacer />

      <Button
        form="otp-form"
        w="full"
        type="submit"
        isDisabled={Object.keys(errors).length !== 0}
        isLoading={loading}
      >
        {t("confirm")}
      </Button>
    </VStack>
  );
};

export default OTPPage;
