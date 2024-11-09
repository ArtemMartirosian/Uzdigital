import {
    FormControl,
    FormControlProps,
    FormErrorMessage, FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PatternFormat } from "react-number-format";
import { uzbNumberRegex } from "../../../../constants/regex";
import { ISupportForm } from "./SupportForm";
import Phone from "../../icons/Phone";

interface IPhoneNumberInputProps {
  errors: FieldErrors<ISupportForm>;
  control: any;
}
type PhoneNumberProps = IPhoneNumberInputProps & FormControlProps;

const CustomInput = (props: Partial<PhoneNumberProps>) => (
  <InputGroup>
    <InputLeftElement>
      <Phone boxSize={"20px"} fill={"gray.400"} ml={"10px"} mt={"10px"} />
    </InputLeftElement>
    <Input pl={"52px"} {...props} />
  </InputGroup>
);
export const PhoneNumberInput = ({
  errors,
  control,
  label,
  ...props
}: PhoneNumberProps) => {
  const { t } = useTranslation();

  return (
    <FormControl isInvalid={!!errors?.phone} {...props} mb='20px' >
        {
            label && (
                <FormLabel fontSize="16px" fontWeight={500} mb={2}>
                    {t(label)}
                </FormLabel>
            )
        }
      <Controller
        name="phone"
        control={control}
        rules={{
          required: t("required_field"),
          pattern: {
            value: uzbNumberRegex,
            message: t("invalid_number"),
          },
        }}
        render={({ field: { name, value, onChange, onBlur } }) => (
          <PatternFormat
            type="tel"
            format="+998 (##) ### ## ##"
            customInput={CustomInput}
            placeholder={"+998"}
            mask="_"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {errors?.phone?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
