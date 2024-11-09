import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { t } from "i18next";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CSelect } from "../../../../components/CSelect/CSelect";
import { ISupportForm } from "./SupportForm";
import { Props } from "chakra-react-select";

type SubjectSelectProps = {
  errors: FieldErrors<ISupportForm>;
  control: Control<ISupportForm, unknown>;
};

export const SubjectSelect = ({
  errors,
  control,
  ...selectProps
}: SubjectSelectProps & Props) => {
  return (
    <FormControl isInvalid={!!errors.subject}>
      <Controller
        name="subject"
        control={control}
        rules={{
          required: t("required_field"),
          validate: (option) =>
            option.value === "" ? t("required_field") : true,
        }}
        render={({ field: { name, value, onChange, onBlur } }) => (
          <CSelect
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...selectProps}
          />
        )}
      />
      <FormErrorMessage fontSize="14px" fontWeight={500}>
        {errors.subject?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
