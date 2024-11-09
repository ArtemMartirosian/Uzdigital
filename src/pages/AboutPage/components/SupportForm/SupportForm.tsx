import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useFeedbackCreateMutation } from "../../../../apis/FeedbackApis/FeedbackApis.service";
import { useMediaCreateMutation } from "../../../../apis/MediaApis/MediaApis.service";
import { SectionTitle } from "../../../../components/SectionTitle/SectionTitle";
import useTelegram from "../../../../hooks/useTelegram";
import { IBackendResponse } from "../../../../types/IBackendResponse.type";
import { FeedbackModal } from "../FeedbackModal/FeedbackModal";
import { ImageGrid } from "./ImageGrid";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { SubjectSelect } from "./SubjectSelect";

export interface ISupportForm {
  subject: {
    label: string;
    value: string;
  };
  phone: string;
  message: string;
  support_photo: string;
}

export const SupportForm = () => {
  const { t } = useTranslation();
  const { tg } = useTelegram();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<ISupportForm>({
    defaultValues: {
      subject: { label: t("support_page.subject_placeholder"), value: "" },
      phone: "",
      message: "",
      support_photo: "",
    },
  });

  const formData = new FormData();

  const [photos, setPhotos] = useState<File[]>([]);
  const [isFeedbackSuccess, setIsFeedbackSuccess] = useState<boolean>();
  // const [feedbackResultMessage, setFeedbackResultMessage] = useState<string>();

  const subjectOptions = [
    { label: t("support_page.review"), value: "review" },
    { label: t("support_page.suggestion"), value: "suggestion" },
    { label: t("support_page.question"), value: "question" },
    { label: t("support_page.claim"), value: "claim" },
  ];

  const { mutate: imagesMutate } = useMediaCreateMutation();
  const { mutate: feedbackMutate, isPending } = useFeedbackCreateMutation();

  const onFormSuccess = () => {
    setIsFeedbackSuccess(true);
    // setFeedbackResultMessage(t("get_in_touch"));
    setPhotos([]);
    reset();
    onOpen();
  };

  const onFormError = () => {
    setIsFeedbackSuccess(false);
    // setFeedbackResultMessage(errorMessage);
    onOpen();
  };

  const onImageFeedback = (formValues: ISupportForm) => {
    for (let i = 0; i < photos.length; i++) {
      formData.append("image", photos[i]);
    }

    imagesMutate(formData, {
      onSuccess: (imagesRes: IBackendResponse<string[]>) => {
        feedbackMutate(
          {
            subject: formValues.subject.value,
            phone: formValues.phone,
            message: formValues.message,
            images: imagesRes.data,
          },
          {
            onSuccess: onFormSuccess,
            onError: () => onFormError(),
          }
        );
      },
      onError: () => onFormError(),
    });
  };

  const onSimpleFeedback = (formValues: ISupportForm) => {
    feedbackMutate(
      {
        subject: formValues.subject.value,
        phone: formValues.phone,
        message: formValues.message,
      },
      {
        onSuccess: onFormSuccess,
        onError: () => onFormError(),
      }
    );
  };

  const onSubmit = (formValues: ISupportForm) => {
    tg.HapticFeedback.impactOccurred("rigid");
    formValues.phone = "+" + formValues.phone.replace(/\D/g, "");

    if (photos?.length) {
      onImageFeedback(formValues);
      return;
    }

    onSimpleFeedback(formValues);
  };

  const handleFormFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    document.body.classList.add("keyboard");

    e.target.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const handleFormBlur = () => {
    document.body.classList.remove("keyboard");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("keyboard");
    };
  }, []);

  return (
    <Box position={"relative"} h="100%">
      <FeedbackModal
        isOpen={isOpen}
        onClose={onClose}
        isSuccess={isFeedbackSuccess}
      />

      <SectionTitle title={t("support_page.feedback")} mb="10px" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack role="group" gap="18px" align="stretch">
          <SubjectSelect
            errors={errors}
            control={control}
            options={subjectOptions}
            isSearchable={false}
            placeholder={t("support_page.subject_placeholder")}
          />

          <PhoneNumberInput
            control={control}
            errors={errors}
            onFocus={handleFormFocus}
            onBlur={handleFormBlur}
          />

          <FormControl
            onFocus={handleFormFocus}
            onBlur={handleFormBlur}
            isInvalid={!!errors.message}
          >
            <Textarea
              {...register("message", { required: t("required_field") })}
              placeholder={t("support_page.message_placeholder")}
              minHeight="120px"
              errorBorderColor="error"
            />
            <FormErrorMessage fontSize="14px" fontWeight={500}>
              {errors.message?.message}
            </FormErrorMessage>
          </FormControl>

          <ImageGrid photos={photos} setPhotos={setPhotos} />

          <Button
            w="100%"
            type="submit"
            variant="primary"
            isDisabled={isPending}
          >
            {t("send")}
          </Button>

          {/* <Box h="0px" transition="300ms" _groupFocusWithin={{ h: "300px" }} /> */}
        </VStack>
      </form>
    </Box>
  );
};
