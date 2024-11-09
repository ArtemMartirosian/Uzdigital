import {SectionTitle} from "../../components/SectionTitle/SectionTitle.tsx";
import {Text} from "@chakra-ui/layout";
import {OTPInput} from "../../components/OTPInput/OTPInput.tsx";
import {CodeTimer} from "../OTPPage/components/CodeTimer.tsx";
import {Button, Spacer, VStack} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {mainPaths} from "../../routes/paths/mainPaths.ts";
import {IOTPForm} from "../OTPPage/OTPPage.tsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

const ResetPasswordPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

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


    const onSubmit = (data: IOTPForm) => {
        console.log("data", data);

        navigate(mainPaths.RecoveryPassword, { state: { status: "paid" } });

        reset();
    };

    return (
        <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
            <SectionTitle title={t("reset_password")} mb="26px" />
            <Text fontSize="16px" mb="22px">
                {t("reset_password_description")}{" "}
                <Text as="span" color="activePurple" fontWeight={500}>
                    +998 (90) *** ** 12
                </Text>
            </Text>

            <form id="otp-form" onSubmit={handleSubmit(onSubmit)}>
                <OTPInput control={control} errors={errors} />
            </form>

            <CodeTimer />

            <Spacer />

            <Button
                form="otp-form"
                w="full"
                type="submit"
                isDisabled={Object.keys(errors).length !== 0}
            >
                {t("confirm")}
            </Button>
        </VStack>
    );
};

export default ResetPasswordPage;