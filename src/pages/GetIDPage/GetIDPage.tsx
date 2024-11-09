import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { InfoCircleIcon } from "../../assets/icons/InfoCircleIcon";
import { useForm } from "react-hook-form";
import { useCheckAccountIdByCDSNMutation } from "../../apis/CheckAccountIdByCDSN.service";
import { MessageModal } from "../ApplicationPage/components/MessageModal/MessageModal";
import { useState } from "react";
import CDSN from "../../assets/images/CDSN.png";
import USN from "../../assets/images/USN.jpg";
import { useTranslation } from "react-i18next";
interface IForm {
  cdsn: string;
  usn: string;
}

const GetIDPage = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [infoOf, setInfoOf] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<IForm>();

  const {
    mutate: checkId,
    isSuccess,
    isPending,
    data: IdData,
  } = useCheckAccountIdByCDSNMutation({
    onSuccess: onOpen,
    onError: onOpen,
  });

  const onSubmit = (data: IForm) => {
    checkId(data);
  };

  const onModalClose = () => {
    setInfoOf(null);
    onClose();
  };

  const infoImage = infoOf === "cdsn" ? CDSN : infoOf === "usn" ? USN : null;

  return (
    <Grid h={"100%"} gridTemplateRows={"auto 1fr"}>
      <GridItem>
        <SectionTitle my={5} title={t("get_id")} />
        <form id="get-id" onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={5}>
            <FormLabel>
              {t("label_cdsn")}{" "}
              <Text color={"grey"} as={"span"}>
                ({t("11_digit")})
              </Text>
            </FormLabel>
            <Input
              type="number"
              {...register("cdsn", {
                required: true,
                maxLength: 11,
                minLength: 11,
              })}
              inputMode="numeric"
            />
            <FormHelperText
              cursor={"pointer"}
              onClick={() => setInfoOf("cdsn")}
            >
              <HStack>
                <InfoCircleIcon />
                <Text>{t("cdsn_on_device")}</Text>
              </HStack>
            </FormHelperText>
          </FormControl>
          <FormControl mb={5}>
            <FormLabel>
              {t("label_usn")}{" "}
              <Text color={"grey"} as={"span"}>
                ({t("11_digit")})
              </Text>
            </FormLabel>
            <Input
              type="number"
              {...register("usn", {
                required: true,
                maxLength: 11,
                minLength: 11,
              })}
              inputMode="numeric"
            />
            <FormHelperText cursor={"pointer"} onClick={() => setInfoOf("usn")}>
              <HStack>
                <InfoCircleIcon />
                <Text>{t("usn_on_device")}</Text>
              </HStack>
            </FormHelperText>
          </FormControl>
        </form>
      </GridItem>
      <GridItem alignSelf={"end"} pb={10}>
        <Button
          isLoading={isPending}
          isDisabled={!isValid}
          type="submit"
          form="get-id"
          w={"full"}
        >
          {t("get_id")}
        </Button>
      </GridItem>
      <MessageModal
        isSuccess={isSuccess}
        isOpen={!!(isOpen || infoOf)}
        onClose={onModalClose}
        title={isSuccess ? t("statuses.SUCCESS") : t("mistake")}
        subtitle={isSuccess ? t("know_id") : t("not_found")}
        IdData={IdData?.data}
        infoImage={infoImage}
      />
    </Grid>
  );
};

export default GetIDPage;
