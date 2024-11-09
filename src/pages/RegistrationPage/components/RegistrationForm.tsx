import {Box} from "@chakra-ui/react";
import {PhoneNumberInput} from "../../AboutPage/components/SupportForm/PhoneNumberInput.tsx";
import {PasswordInput} from "./PasswordInput.tsx";
import {useForm} from "react-hook-form";

export interface IRegistrationForm {
    phone: string;
    password: string;
    replyPassword: string;
    acceptTerms: boolean;
}


const RegistrationForm = () => {



    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IRegistrationForm>({
        defaultValues: {
            phone: "",
            password: "",
            replyPassword: "",
            acceptTerms: false
        },
    });



    const onSubmit = (formValues: IRegistrationForm) => {
        console.log(formValues , "form")
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PhoneNumberInput
                    label="phone_number"
                    control={control}
                    errors={errors}
                />

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

                {/*<Checkbox*/}
                {/*    {...register("acceptTerms")}*/}
                {/*    colorScheme="blue" // Customize color scheme as needed*/}
                {/*>*/}
                {/*    <Text textAlign='center' color="darkGrey" fontSize="16px">*/}
                {/*        {t("accept_terms")}{" "}*/}
                {/*        <Text*/}
                {/*            as="button"*/}
                {/*            color="activePurple"*/}
                {/*            fontWeight={500}*/}
                {/*            textDecoration="underline"*/}
                {/*        >*/}
                {/*            {t("offert")}*/}
                {/*        </Text>*/}
                {/*    </Text>*/}
                {/*</Checkbox>*/}


            </form>

        </Box>
    );
};

export default RegistrationForm;