import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { mainPaths } from "../../../routes/paths/mainPaths";
import { useEffect } from "react";

interface IIDForm {
  account_id: string;
}

const IDForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IIDForm>();

  const onSubmit = (data: IIDForm) => {
    navigate(mainPaths.IDForm, { state: { account_id: data.account_id } });
  };

  const handleFocus = () => {
    document.body.classList.add("focusedItems");
  };

  const handleBlur = () => {
    document.body.classList.remove("focusedItems");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("focusedItems");
    };
  }, []);

  return (
    <HStack
      as="form"
      gap="10px"
      alignItems="flex-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.account_id}>
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
          placeholder={t("account_id")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <FormErrorMessage fontSize="14px" fontWeight={500}>
          {errors.account_id?.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        flexBasis="33.3%"
        flexShrink={0}
        isDisabled={Object.keys(errors).length !== 0}
      >
        {t("top_up")}
      </Button>
    </HStack>
  );
};

export default IDForm;
