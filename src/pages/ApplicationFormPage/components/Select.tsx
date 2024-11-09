import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { CSelect } from "../../../components/CSelect/CSelect";

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  leftIcon?: JSX.Element;
}

const Select = <T extends FieldValues>({
  name,
  errors,
  control,
  label,
  placeholder,
  ...selectProps
}: SelectProps<T>) => {
  const getErrorMessage = () => {
    const error = errors[name];
    if (error && typeof error.message === "string") {
      return error.message;
    }
    return undefined;
  };
  return (
    <FormControl isInvalid={!!errors[name]}>
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
        }}
        render={({ field: { name, value, onChange, onBlur } }) => (
          <CSelect
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            {...selectProps}
          />
        )}
      />

      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {getErrorMessage()}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Select;
