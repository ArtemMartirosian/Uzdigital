import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { REGIONS_GET } from "../../constants/queryKeys";
import { regions } from "../../constants/slugs";
import { IBackendResponse } from "../../types/IBackendResponse.type";
import request from "../config/axiosConfig";

const slug = regions;

export const regionsApis = {
  get: (): Promise<IBackendResponse<unknown>> => request.get(slug),
};

export const useGetRegions = (
  queryOptions?: Partial<UseQueryOptions<IBackendResponse<unknown>, AxiosError>>
) =>
  useQuery<IBackendResponse<unknown>, AxiosError>({
    queryKey: [REGIONS_GET],
    queryFn: () => regionsApis.get(),
    ...queryOptions,
  });
