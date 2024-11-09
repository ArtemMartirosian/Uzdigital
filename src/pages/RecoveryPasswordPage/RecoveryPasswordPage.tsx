import { Button, Spacer, VStack} from "@chakra-ui/react";
import {SectionTitle} from "../../components/SectionTitle/SectionTitle.tsx";
import {useTranslation} from "react-i18next";
import {PasswordInput} from "../RegistrationPage/components/PasswordInput.tsx";
import {useForm} from "react-hook-form";
import {IRegistrationForm} from "../RegistrationPage/components/RegistrationForm.tsx";
import {useNavigate} from "react-router-dom";
import {mainPaths} from "../../routes/paths/mainPaths.ts";


const RecoveryPasswordPage = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IRegistrationForm>({
        defaultValues: {
            password: "",
            replyPassword: "",
        },
    });

    const onSubmit = (formValues: IRegistrationForm) => {
        console.log(formValues , "form")

        navigate(mainPaths.Account);

    };

    return (
        <VStack h="full" gap={0} alignItems="stretch" pt={5} pb={10}>
           <SectionTitle title={t("recovery_password")} mb="20px"/>

            <form id="recover-form" onSubmit={handleSubmit(onSubmit)} >
                <PasswordInput
                    name='password'
                    label="password"
                    control={control}
                    errors={errors}
                    mb='20px'
                />
                <PasswordInput
                    name='replyPassword'
                    label="repeat_password"
                    control={control}
                    errors={errors}
                    mb='27px'
                />
            </form>

            <Spacer />

            <Button
                form="recover-form"
                w="full"
                type="submit"
                isDisabled={Object.keys(errors).length !== 0}
            >
                {t("confirm")}
            </Button>

        </VStack>
    );
};

export default RecoveryPasswordPage;