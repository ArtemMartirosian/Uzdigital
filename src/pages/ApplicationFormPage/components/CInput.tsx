import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface CInputProps<T extends FieldValues> {
  name: Path<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  label: string;
  placeholder: string;
  inputLeftElement?: JSX.Element;
}

const CInput = <T extends FieldValues>({
  name,
  errors,
  register,
  label,
  placeholder,
  inputLeftElement,
}: CInputProps<T>) => {
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
        {label}{" "}
        <Text as={"span"} color={"red"}>
          *
        </Text>
      </FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          left="12px"
          top="50%"
          transform="translateY(-50%)"
          bg="white"
        >
          {inputLeftElement}
        </InputLeftElement>
        <Input
          {...register(name, { required: true })}
          placeholder={placeholder}
          pl="52px"
        />
      </InputGroup>
      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {getErrorMessage()}
      </FormErrorMessage>
    </FormControl>
  );
};

export default CInput;
