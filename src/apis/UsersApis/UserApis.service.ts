import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  GET_USER,
  PATCH_USER,
  PATH_USER_LANGUAGE,
  VERIFY_USER,
} from "../../constants/queryKeys";
import { users } from "../../constants/slugs";
import { IBackendResponse } from "../../types/IBackendResponse.type";
import request from "../config/axiosConfig";
import { IUser, IUserPatchPayload } from "./UsersApis.types";
import { useTranslation } from "react-i18next";

const slug = users;
const changeLanguageSlug = "/change-language";

export const userApis = {
  get: (): Promise<IBackendResponse<IUser>> => request.get(slug),

  patch: (pathPayload: IUserPatchPayload): Promise<IBackendResponse> =>
    request.patch(slug, pathPayload),

  pathLanguage: (
    language: Pick<IUserPatchPayload, "language">
  ): Promise<IBackendResponse<IUser>> =>
    request.patch(slug + changeLanguageSlug, language),

  verify: (otp: string): Promise<IBackendResponse> => request.post(slug, otp),
};

export const useGetUser = (
  queryOptions?: Partial<UseQueryOptions<IBackendResponse<IUser>, AxiosError>>
) => {
  const { i18n } = useTranslation();

  return useQuery<IBackendResponse<IUser>, AxiosError>({
    queryKey: [GET_USER, queryOptions, i18n.language],
    queryFn: () => userApis.get(),
    ...queryOptions,
  });
};

export const usePatchUser = (
  mutationOptions?: Partial<
    UseMutationOptions<IBackendResponse, AxiosError, IUserPatchPayload>
  >
) =>
  useMutation<IBackendResponse, AxiosError, IUserPatchPayload>({
    mutationKey: [PATCH_USER],
    mutationFn: (pathPayload: IUserPatchPayload) => userApis.patch(pathPayload),
    ...mutationOptions,
  });

export const usePatchUserLanguage = (
  mutationOptions?: Partial<
    UseMutationOptions<IBackendResponse<IUser>, AxiosError, IUserPatchPayload>
  >
) =>
  useMutation<IBackendResponse<IUser>, AxiosError, IUserPatchPayload>({
    mutationKey: [PATH_USER_LANGUAGE],
    mutationFn: (language: Pick<IUserPatchPayload, "language">) =>
      userApis.pathLanguage(language),
    ...mutationOptions,
  });

export const useVerifyUser = (
  mutationOptions?: Partial<
    UseMutationOptions<IBackendResponse, AxiosError, string>
  >
) =>
  useMutation<IBackendResponse, AxiosError, string>({
    mutationKey: [VERIFY_USER],
    mutationFn: (otp: string) => userApis.verify(otp),
    ...mutationOptions,
  });
