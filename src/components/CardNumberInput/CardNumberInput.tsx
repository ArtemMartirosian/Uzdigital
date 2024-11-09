import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PatternFormat } from "react-number-format";
import { CardIcon } from "../../assets/icons/CardIcon";
import { HumoCardLogo } from "../../assets/icons/HumoCardLogo";
import { UzCardLogo } from "../../assets/icons/UzCardLogo";
// import { cardRegex } from "../../constants/regexs";
import { ICardForm } from "../../pages/PaymentDetailsPage/components/CardForm";
import { TCardType } from "../../types/TCardType.type";
import { cardTypeDetector } from "../../utils/cardTypeDetector";

interface ICardNumberInputProps {
  errors: FieldErrors<ICardForm>;
  control: Control<ICardForm>;
}

export const CardNumberInput = ({ errors, control }: ICardNumberInputProps) => {
  const { t } = useTranslation();

  return (
    <FormControl mb={5} isInvalid={!!errors.card_number}>
      <FormLabel fontSize="16px" fontWeight={500} mb={2}>
        {t("payment_details_page.card_number_label")}
      </FormLabel>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          left="18px"
          top="50%"
          transform="translateY(-50%)"
        >
          <CardIcon />
        </InputLeftElement>
        <Controller
          control={control}
          name="card_number"
          // rules={{
          //   required: t("required_field"),
          //   pattern: {
          //     value: cardRegex,
          //     message: t("incorrect_card_number"),
          //   },
          //   validate: (value) =>
          //     value.replace(/ /g, "").length === 16
          //       ? true
          //       : t("incorrect_card_number"),
          // }}
          render={({ field: { value, onChange, onBlur, ref } }) => {
            const code = value?.slice(0, 4);
            const cardType: TCardType | null = code
              ? cardTypeDetector(code)
              : null;

            return (
              <>
                <PatternFormat
                  getInputRef={ref}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  format="#### #### #### ####"
                  customInput={Input}
                  inputMode="numeric"
                  placeholder={t(
                    "payment_details_page.card_number_placeholder"
                  )}
                  pl="52px"
                />
                <HStack
                  as={InputRightElement}
                  gap="7px"
                  w="min-content"
                  top="50%"
                  transform="translateY(-50%)"
                  right="18px"
                >
                  <UzCardLogo opacity={cardType === "uzcard" ? "1" : "0.2"} />
                  <HumoCardLogo opacity={cardType === "humo" ? "1" : "0.2"} />
                </HStack>
              </>
            );
          }}
        />
      </InputGroup>
      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {errors.card_number?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
