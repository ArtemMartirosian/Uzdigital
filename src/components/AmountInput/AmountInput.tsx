import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { t } from "i18next";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { MoneyIcon } from "../../assets/icons/MoneyIcon";
import { IIDForm } from "../../pages/IDFormPage/IDFormPage";

interface IAmountInputProps {
  errors: FieldErrors<IIDForm>;
  control: Control<IIDForm>;
}

export const AmountInput = ({ errors, control }: IAmountInputProps) => {
  return (
    <FormControl isInvalid={!!errors.amount}>
      <FormLabel fontSize="16px" fontWeight={500} mb={2}>
        {t("id_form_page.amount_label")}
      </FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          left="18px"
          top="50%"
          transform="translateY(-50%)"
          bg="white"
        >
          <MoneyIcon />
        </InputLeftElement>

        <Controller
          name="amount"
          control={control}
          rules={{
            required: t("required_field"),
            validate: (value) => {
              if (Number(value) < 1000) {
                return t("min_price_1000_sum");
              } else if (Number(value) >= 100000000) {
                return t("max_price_100000000_sum");
              }
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <NumericFormat
              customInput={Input}
              inputMode="numeric"
              allowNegative={false}
              thousandSeparator={" "}
              placeholder={t("id_form_page.amount_placeholder")}
              value={value}
              onBlur={onBlur}
              pl="52px"
              onValueChange={(values) => {
                onChange(values.value);
              }}
            />
          )}
        />

        <InputRightElement
          right="14px"
          top="50%"
          transform="translateY(-50%)"
          pointerEvents="none"
          pl="14px"
          bg="white"
          color="secondaryGrey"
          fontWeight={500}
        >
          UZS
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {errors.amount?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
