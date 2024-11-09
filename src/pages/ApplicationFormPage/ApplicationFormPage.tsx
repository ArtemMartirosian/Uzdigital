/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApplicationsCreateMutation } from "../../apis/ApplicationApis/ApplicationApis.service";
import { useGetRegions } from "../../apis/RegionsApis/RegionsApis.service";
import { Location } from "../../assets/icons/Location";
import { UserFilledIcon } from "../../assets/icons/UserFilledIcon";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import useTelegram from "../../hooks/useTelegram";
import { mainPaths } from "../../routes/paths/mainPaths";
import CInput from "./components/CInput";
import { PhoneNumberInput } from "./components/PhoneInput";
import Select from "./components/Select";
import { useTranslation } from "react-i18next";
export interface IApplicationForm {
  fullName: string;
  phone: string;
  region: {
    label: string;
    value: string;
  };
  district:
    | {
        label: string;
        value: string;
      }
    | "";
  address: string;
  acceptTerms: boolean;
}

const ApplicationFormPage = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutate: createApplication, isPending } =
    useApplicationsCreateMutation({
      onSuccess: () => {
        localStorage.setItem("applicationCreated", "true");
        navigate(mainPaths.Application, { replace: true });
      },
      onError: () => {
        localStorage.setItem("applicationCreated", "false");
        navigate(mainPaths.Application, { replace: true });
      },
    });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
  } = useForm<IApplicationForm>();

  const onSubmit = (data: IApplicationForm) => {
    const body = {
      fio: data.fullName,
      phone_number: data.phone.replace(/[ ()]/g, ""),
      region: data.region.value,
      district: "",
      address: data.address,
    };
    if (data.district) {
      body.district = data.district.value;
    }

    createApplication(body);
  };

  const { data: regions } = useGetRegions();

  const regionOptions = Object.keys(regions?.data || {}).map((key) => ({
    value: key,
    label: key,
  }));

  const districtOptions = useMemo(() => {
    if (watch("region")) {
      setValue("district", "");
      // @ts-expect-error
      const districts = regions?.data?.[watch("region").value];
      return Object.keys(districts).map((district) => ({
        label: district,
        value: district,
      }));
    }
    return [];
  }, [watch("region")]);

  const handleFocus = (e: React.FocusEvent<HTMLFormElement>) => {
    const roleAttribute = e.target.getAttribute("role");

    if (tg.platform === "ios" && !roleAttribute) {
      document.body.classList.add("keyboard");
    }

    e.target.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  const handleBlur = () => {
    const point = document.getElementById("point");
    point &&
      point.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

    if (tg.platform === "ios") {
      document.body.classList.remove("keyboard");
    }
  };

  return (
    <>
      <SectionTitle my={5} title={t("new_request")} />

      <form
        id="application-form"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={5} mb={5}>
          <Box id="point" />
          <CInput<IApplicationForm>
            name="fullName"
            label={t("full_name")}
            placeholder={t("type_full_name")}
            errors={errors}
            register={register}
            inputLeftElement={<UserFilledIcon />}
          />
          <PhoneNumberInput<IApplicationForm>
            label={t("phone_number")}
            name="phone"
            control={control}
          />

          <Select<IApplicationForm>
            name="region"
            errors={errors}
            control={control}
            label={t("region")}
            placeholder={t("select_region")}
            options={regionOptions || [{ value: "", label: "" }]}
          />
          <Select<IApplicationForm>
            name="district"
            errors={errors}
            control={control}
            label={t("district")}
            placeholder={t("select_district")}
            options={districtOptions}
          />
          <CInput<IApplicationForm>
            name="address"
            label={t("address")}
            placeholder={t("type_address")}
            errors={errors}
            register={register}
            inputLeftElement={<Location />}
          />
          {/* <Checkbox {...register("acceptTerms", { required: true })}>
            {t("accept_terms")} Оферты
          </Checkbox> */}
        </Stack>
      </form>
      <Button
        isLoading={isPending}
        isDisabled={!isValid}
        type="submit"
        form="application-form"
        w={"100%"}
        mb={10}
      >
        {t("send")}
      </Button>
    </>
  );
};

export default ApplicationFormPage;
