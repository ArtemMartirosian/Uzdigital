import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { PatternFormat } from "react-number-format";
import Phone from "../../AboutPage/icons/Phone";

// Define a generic type for form values
interface PhoneNumberInputProps<T extends FieldValues> {
  name: Path<T>;
  errors?: FieldErrors<T>;
  control: Control<T>;
  label: string;
}
type PhoneNumberProps<T extends FieldValues> = PhoneNumberInputProps<T> &
  FormControlProps;

const CustomInput = (props: Partial<PhoneNumberProps<FieldValues>>) => (
  <InputGroup>
    <InputLeftElement pl={"12px"}>
      <Phone boxSize={"20px"} fill={"gray.400"} ml={"10px"} mt={"14px"} />
    </InputLeftElement>
    <Input pl={"52px"} {...props} />
  </InputGroup>
);

export const PhoneNumberInput = <T extends FieldValues>({
  name,
  errors,
  control,
  label,
  ...props
}: PhoneNumberProps<T>) => {
  return (
    <FormControl isInvalid={errors && !!errors[name]} {...props}>
      <FormLabel fontSize="16px" fontWeight={500} mb={2}>
        {label}
        <Text pl={1} as={"span"} color={"red"}>
          *
        </Text>
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
          validate: (value) => {
            if (value?.replace(/[ ()_+]/g, "").length === 12) {
              return true;
            } else {
              return false;
            }
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
        {errors && (errors[name]?.message as string)}
      </FormErrorMessage>
    </FormControl>
  );
};
