import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  APPLICATIONS_CREATE,
  APPLICATIONS_GETALL,
  APPLICATIONS_GET_BY_UUID,
} from "../../constants/queryKeys";
import { connection_applications } from "../../constants/slugs";
import { IBackendResponse } from "../../types/IBackendResponse.type";
import request from "../config/axiosConfig";
import {
  IApplicationApisPayload,
  IApplicationApisResponse,
} from "./ApplicationApis.types";
import { AxiosError } from "axios";

const slug = connection_applications;

export const applicationsApis = {
  get: (): Promise<IBackendResponse<IApplicationApisResponse[]>> =>
    request.get(slug),
  getById: (id: string): Promise<IBackendResponse<IApplicationApisResponse>> =>
    request.get(`${slug}/${id}`),
  create: (
    applicationsPayload: IApplicationApisPayload
  ): Promise<IBackendResponse> => request.post(slug, applicationsPayload),
};

export const useGetApplications = (
  queryOptions?: Partial<
    UseQueryOptions<IBackendResponse<IApplicationApisResponse[]>, AxiosError>
  >
) => {
  return useQuery<IBackendResponse<IApplicationApisResponse[]>, AxiosError>({
    queryKey: [APPLICATIONS_GET_BY_UUID, queryOptions],
    queryFn: () => applicationsApis.get(),
    ...queryOptions,
  });
};

export const useGetApplicationById = (
  id: string,
  queryOptions?: Partial<
    UseQueryOptions<IBackendResponse<IApplicationApisResponse>, AxiosError>
  >
) => {
  return useQuery<IBackendResponse<IApplicationApisResponse>, AxiosError>({
    queryKey: [APPLICATIONS_GETALL, id, queryOptions],
    queryFn: () => applicationsApis.getById(id),
    ...queryOptions,
  });
};

export const useApplicationsCreateMutation = (
  mutationOptions?: Partial<
    UseMutationOptions<IBackendResponse, Error, IApplicationApisPayload>
  >
) =>
  useMutation<IBackendResponse, Error, IApplicationApisPayload>({
    mutationKey: [APPLICATIONS_CREATE],
    mutationFn: (applicationsPayload) =>
      applicationsApis.create(applicationsPayload),
    ...mutationOptions,
  });
