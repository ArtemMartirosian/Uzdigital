import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PatternFormat } from "react-number-format";
import { ICardForm } from "../../pages/PaymentDetailsPage/components/CardForm";

interface IExpirationInputProps {
  errors: FieldErrors<ICardForm>;
  control: Control<ICardForm>;
  rightElement?: boolean;
}

export const ExpirationInput = ({ errors, control , rightElement = true }: IExpirationInputProps) => {
  const { t } = useTranslation();

  return (
    <FormControl isInvalid={!!errors.expiration} w="fit-content">
      <FormLabel fontSize="16px" fontWeight={500} mb={2}>
        {t("payment_details_page.expiration_label")}
      </FormLabel>
      <InputGroup>
        <Controller
          name="expiration"
          control={control}
          rules={{
            required: t("required_field"),
            validate: (value) => {
              const currentMonth = new Date().getMonth();
              const typedMonth = Number(value.slice(0, 2));
              const currentYear = Number(
                new Date().getFullYear().toString().slice(2, 4)
              );
              const typedYear = Number(value.slice(3, 5));

              if (typedMonth < currentMonth && typedYear === currentYear) {
                return t("incorrect_date");
              }

              if (typedMonth > 12) return t("incorrect_date");

              return typedYear >= currentYear ? true : t("incorrect_date");
            },
          }}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <PatternFormat
              getInputRef={ref}
              format="##/##"
              customInput={Input}
              inputMode="numeric"
              placeholder={t("payment_details_page.expiration_placeholder")}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              autoComplete="off"
              autoSave="off"
            />
          )}
        />

          {
              rightElement && (
                  <InputRightElement
                      right="14px"
                      top="50%"
                      transform="translateY(-50%)"
                      pointerEvents="none"
                      pl="14px"
                      color="secondaryGrey"
                      fontWeight={500}
                  >
                      UZS
                  </InputRightElement>
              )
          }


      </InputGroup>
      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {errors.expiration?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
