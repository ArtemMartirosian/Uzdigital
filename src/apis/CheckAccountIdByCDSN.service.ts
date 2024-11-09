import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { checkAccountIdByCDSN } from "../constants/slugs";
import { IBackendResponse } from "../types/IBackendResponse.type";
import request from "./config/axiosConfig";

export interface ICheckAccountIDResponse {
  client_id: string;
  balance: string;
  zone: string;
  package: string;
  status: string;
}
interface ICheckAccountIDPayload {
  cdsn: string;
  usn: string;
}

const slug = checkAccountIdByCDSN;

export const checkAccountIdApis = {
  get: (
    body: ICheckAccountIDPayload
  ): Promise<IBackendResponse<ICheckAccountIDResponse>> => {
    return request.post(slug, body);
  },
};

export const useCheckAccountIdByCDSNMutation = (
  mutationOptions?: Partial<
    UseMutationOptions<
      IBackendResponse<ICheckAccountIDResponse>,
      Error,
      ICheckAccountIDPayload
    >
  >
) =>
  useMutation<
    IBackendResponse<ICheckAccountIDResponse>,
    Error,
    ICheckAccountIDPayload
  >({
    mutationKey: [""],
    mutationFn: (
      body: ICheckAccountIDPayload
    ): Promise<IBackendResponse<ICheckAccountIDResponse>> =>
      checkAccountIdApis.get(body),
    ...mutationOptions,
  });
