import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    IconButton, InputLeftElement,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {PasswordKeyIcon} from "../../../assets/icons/PasswordKeyIcon.tsx";
import {EyeOpen} from "../../../assets/icons/EyeOpen.tsx";
import {EyeClosed} from "../../../assets/icons/EyeClosed.tsx";
import {IRegistrationForm} from "./RegistrationForm.tsx";

interface IPasswordInputProps {
    errors: FieldErrors<IRegistrationForm>;
    control: Control<IRegistrationForm, unknown>;
    label?: string;
    name: keyof IRegistrationForm;
    value?: string;
    mb?: string;
}


export const PasswordInput = ({
                                  errors,
                                  control,
                                  label,
                                  name,
                                  ...props
                              }: IPasswordInputProps) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <FormControl isInvalid={!!errors?.password} {...props}>
            {label && (
                <FormLabel fontSize="16px"   fontWeight={500} mb={1}>
                    {t(label)}
                </FormLabel>
            )}
            <Controller
                name={name}
                control={control}
                rules={{
                    required: t("required_field"),
                    minLength: { value: 6, message: t("password_min_length") },
                }}
                render={({ field: { onChange, onBlur, name } }) => (
                    <InputGroup>
                        <InputLeftElement>
                            <PasswordKeyIcon boxSize={"20px"} ml={"10px"} mt={"15px"} />
                        </InputLeftElement>
                        <Input
                            pl={"52px"}
                            type={showPassword ? "text" : "password"}
                            placeholder={t("enter_password")}
                            name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                        />
                        <InputRightElement>
                            <IconButton
                                mt='15px'
                                mr="18px"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                icon={showPassword ? <EyeOpen /> : <EyeClosed />}
                                onClick={toggleShowPassword}
                                variant="white"
                            />
                        </InputRightElement>
                    </InputGroup>
                )}
            />
            <FormErrorMessage fontSize="14px" fontWeight={500}>
                {errors?.password?.message}
            </FormErrorMessage>
        </FormControl>
    );
};
