import { Box } from "@chakra-ui/react";
import {  useForm, SubmitHandler } from "react-hook-form";
import { PhoneNumberInput } from "../../AboutPage/components/SupportForm/PhoneNumberInput";
import {IRegistrationForm} from "../../RegistrationPage/components/RegistrationForm.tsx";
import {useNavigate} from "react-router-dom";
import {mainPaths} from "../../../routes/paths/mainPaths.ts";
import request from "../../../apis/config/axiosConfig.ts";
import {FC, useState} from "react";
import {Text} from "@chakra-ui/layout";
import {useTranslation} from "react-i18next";

interface LoginFormProps {
    setLoading?: (loading: boolean) => void;
}

const LoginForm: FC<LoginFormProps> = ({ setLoading }) => {

    const navigate = useNavigate();
    const [error , setError] = useState(false)
    const {t} = useTranslation()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IRegistrationForm>({
        defaultValues: {
            phone: "",
            password: "",
        },
    });

    const formatPhoneNumber = (phoneNumber : string) => {
        // Use a regular expression to remove everything except digits and the plus sign at the start
        return phoneNumber.replace(/[^\d+]/g, '');
    };

    const onSubmit: SubmitHandler<IRegistrationForm> = (formValues) => {
        if (setLoading) {
            setLoading(true)
        }
        const phoneNumber = formatPhoneNumber(formValues?.phone)
        if (!phoneNumber) {
            return;
        }
        setError(false)
        request.post('/otp/send',{phoneNumber})
            .then(response => {
                navigate(mainPaths.OTP , {
                   state : {
                       phoneNumber: phoneNumber,
                       response : response
                   }
                });

            })
            .catch(error => {
                setError(true)
                console.error('Error:', error);
            }).finally(() => {
            if (setLoading) {
                setLoading(false)
            }
        } )
    };

    return (
        <Box>
            <form id='login-form' onSubmit={handleSubmit(onSubmit)}>
                <PhoneNumberInput
                    label="phone_number"
                    control={control}
                    errors={errors}
                />
                {error && (
                    <Text color="red.500" mb="16px" fontSize='18px'>
                        {t("number_not_found")}
                    </Text>
                )}
                {/*<PasswordInput*/}
                {/*    name='password'*/}
                {/*    label="password"*/}
                {/*    control={control}*/}
                {/*    errors={errors}*/}
                {/*    mb='20px'*/}
                {/*/>*/}
                {/*<Text*/}
                {/*    onClick={() => {*/}
                {/*        navigate(mainPaths.RecoveryPassword);*/}
                {/*    }}*/}
                {/*    fontSize='15px'*/}
                {/*    as="button"*/}
                {/*    color="activePurple"*/}
                {/*    fontWeight={500}*/}
                {/*    textDecoration="underline"*/}
                {/*>*/}
                {/*    {t("forgot_password")}*/}
                {/*</Text>*/}

                {/*<h1>{JSON.stringify(window?.Telegram?.WebApp?.initData)}</h1>*/}
            </form>
        </Box>
    );
};

export default LoginForm;
