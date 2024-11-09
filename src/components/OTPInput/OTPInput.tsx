import {
    FormControl,
    FormErrorMessage,
    HStack,
    PinInput,
    PinInputField,
} from "@chakra-ui/react";
import { Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IOTPForm } from "../../pages/OTPPage/OTPPage";

interface IOTPInputProps {
    control: any;
    errors: FieldErrors<IOTPForm>;
    otp?: number;
    isError?: boolean;
}

export const OTPInput = ({ control, errors, isError }: IOTPInputProps) => {
    const { t } = useTranslation();

    return (
        <FormControl w="full" mb="16px" isInvalid={!!errors.otp || isError}>
            <Controller
                control={control}
                name="otp"
                rules={{
                    required: t("required_field"),
                    minLength: {
                        value: 6,
                        message: t("min_length_3"),
                    },
                    maxLength: {
                        value: 8,
                        message: t("max_length_8"),
                    },
                }}
                render={({ field: { value, onChange } }) => (
                    <HStack
                        sx={{
                            input: {
                                h: "56px",
                                fontSize: "24px",
                                flexBasis: "calc(100% / 6)",
                                borderWidth: "1px",
                                borderColor: isError ? "red.500" : "inputGrey",
                                borderRadius: "12px",
                                "&::placeholder": { color: "#999" },
                            },
                        }}
                    >
                        <PinInput
                            value={value}
                            onChange={onChange}
                            otp
                            autoFocus
                            size="lg"
                            type="number"
                            placeholder="0"
                            errorBorderColor="red.500"
                            focusBorderColor="activePurple"
                            isInvalid={!!errors.otp || isError}
                        >
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>
                    </HStack>
                )}
            />

            <FormErrorMessage fontSize="14px" fontWeight={500}>
                {errors.otp?.message}
            </FormErrorMessage>
        </FormControl>
    );
};
