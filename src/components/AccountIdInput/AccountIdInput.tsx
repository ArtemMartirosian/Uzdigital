import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { t } from "i18next";
import { UserFilledIcon } from "../../assets/icons/UserFilledIcon";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IIDForm } from "../../pages/IDFormPage/IDFormPage";

interface IAccountIdInputProps {
  errors: FieldErrors<IIDForm>;
  register: UseFormRegister<IIDForm>;
}

export const AccountIdInput = ({ errors, register }: IAccountIdInputProps) => {
  return (
    <FormControl mb={5} isInvalid={!!errors.account_id}>
      <FormLabel fontSize="16px" fontWeight={500} mb={2}>
        {t("id_form_page.account_id_label")}
      </FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          left="18px"
          top="50%"
          transform="translateY(-50%)"
          bg="white"
        >
          <UserFilledIcon />
        </InputLeftElement>
        <Input
          {...register("account_id", {
            required: t("required_field"),
            minLength: {
              value: 3,
              message: t("min_length_3"),
            },
            maxLength: {
              value: 8,
              message: t("max_length_8"),
            },
          })}
          inputMode="numeric"
          placeholder={t("id_form_page.account_id_placeholder")}
          pl="52px"
        />
      </InputGroup>
      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {errors.account_id?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
