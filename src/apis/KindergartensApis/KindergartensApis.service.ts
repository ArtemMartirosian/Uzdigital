import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  KINDERGARTENS_GETALL,
  KINDERGARTENS_GET_ONE,
} from "../../constants/queryKeys";
import { kindergartens } from "../../constants/slugs";
import request from "../config/axiosConfig";
import {
  IKindergartensGetAllResponse,
  IKindergartensGetOneResponse,
  kindergartensGetaAllParams,
} from "./KindergartensApis.type";
import { IBackendResponse } from "../../types/IBackendResponse.type";

const slug = kindergartens;
const slugById = (id: string) => slug + "/" + id;

export const kindergartensApis = {
  getAll: (
    params: kindergartensGetaAllParams
  ): Promise<IBackendResponse<IKindergartensGetAllResponse>> => {
    return request.get(slug, { params });
  },
  getOne: (
    id: string
  ): Promise<IBackendResponse<IKindergartensGetOneResponse>> =>
    request.get(slugById(id)),
};

export const useKindergartensGetAllQuery = ({
  params,
}: {
  params: kindergartensGetaAllParams;
}) => {
  return useQuery<IBackendResponse<IKindergartensGetAllResponse>, Error>({
    queryKey: [KINDERGARTENS_GETALL, params],
    queryFn: () => kindergartensApis.getAll(params),
  });
};

export const useKindergartensGetOneQuery = ({
  id,
  queryOptions,
}: {
  id: string;
  queryOptions?: Partial<
    UseQueryOptions<IBackendResponse<IKindergartensGetOneResponse>, Error>
  >;
}) =>
  useQuery<IBackendResponse<IKindergartensGetOneResponse>, Error>({
    queryKey: [KINDERGARTENS_GET_ONE, id],
    queryFn: () => kindergartensApis.getOne(id),
    ...queryOptions,
  });
