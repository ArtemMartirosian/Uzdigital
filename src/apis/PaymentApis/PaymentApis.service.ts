import {
  QueryOptions,
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import {
  BY_ACCAUNT_CREATE,
  FAVORITE_CREATE,
  FAVORITE_GETALL,
  PAYMENT_CREATE,
  PAYMENT_GETALL,
  PAYMENT_GET_BY_UUID,
  PAYMENT_GET_ONE,
} from "../../constants/queryKeys";
import { by_accaunt, favorite, payment } from "../../constants/slugs";
import request from "../config/axiosConfig";
import { useTranslation } from "react-i18next";
import { IBackendResponse } from "../../types/IBackendResponse.type";
import {
  IFavoriteBody,
  IPaymentCreateResponse,
  Ipayment,
  byAccountBody,
  paymentBody,
} from "./PaymentApis.types";

const slug = payment;
const slugById = (id: string) => slug + "/" + id;

const subSlug = (subSlug: string) => slug + "/" + subSlug;
const subSlugById = (slug: string, id: string) => subSlug(slug) + "/" + id;

export const paymentApis = {
  getAll: (params: AxiosRequestConfig<unknown> | undefined) =>
    request.get(slug, params),

  getOne: (id: string): Promise<IBackendResponse<Ipayment>> =>
    request.get(slugById(id)),

  create: (
    data: paymentBody
  ): Promise<IBackendResponse<IPaymentCreateResponse>> =>
    request.post(slug, data),

  getByUuid: (uuid: string) => request.get(slugById(uuid)),
  [favorite]: {
    delete: (id: number): Promise<IBackendResponse> =>
      request.delete(subSlugById(favorite, String(id))),

    create: (data: IFavoriteBody): Promise<IBackendResponse> =>
      request.post(subSlug(favorite), data),

    getAll: (
      params: AxiosRequestConfig<unknown> | undefined
    ): Promise<IBackendResponse<Ipayment[]>> =>
      request.get(subSlug(favorite), params),
  },
  [by_accaunt]: {
    create: (
      data: byAccountBody
    ): Promise<IBackendResponse<IPaymentCreateResponse>> =>
      request.post(subSlug(by_accaunt), data),
  },
};

// payment
export const usePaymentGetAllQuery = ({
  params,
}: {
  params: AxiosRequestConfig<unknown>;
}) =>
  useQuery({
    queryKey: [PAYMENT_GETALL, params],
    queryFn: () => paymentApis.getAll(params),
  });

export const usePaymentGetOneQuery = ({
  id,
  queryOptions,
}: {
  id: string;
  queryOptions?: Partial<QueryOptions<IBackendResponse<Ipayment>, Error>>;
}) =>
  useQuery<IBackendResponse<Ipayment>, Error>({
    queryKey: [PAYMENT_GET_ONE, id],
    queryFn: () => paymentApis.getOne(id),
    enabled: !!id,
    ...queryOptions,
  });

export const usePaymentCreateMutation = (
  mutationOptions?: Partial<
    UseMutationOptions<
      IBackendResponse<IPaymentCreateResponse>,
      Error,
      paymentBody
    >
  >
) =>
  useMutation<IBackendResponse<IPaymentCreateResponse>, Error, paymentBody>({
    mutationKey: [PAYMENT_CREATE],
    mutationFn: (data) => paymentApis.create(data),
    ...mutationOptions,
  });

export const usePaymentGetByUuidQuery = ({ uuid }: { uuid: string }) =>
  useQuery({
    queryKey: [PAYMENT_GET_BY_UUID, uuid],
    queryFn: () => paymentApis.getByUuid(uuid),
  });

// favorite
export const useFavoriteCreateMutation = (
  mutationOptioins?: Partial<
    UseMutationOptions<IBackendResponse, Error, IFavoriteBody>
  >
) =>
  useMutation({
    mutationKey: [FAVORITE_CREATE],
    mutationFn: (data) => paymentApis[favorite].create(data),
    ...mutationOptioins,
  });

export const useFavoritesGetAllQuery = ({
  params,
}: {
  params: AxiosRequestConfig<unknown>;
}) => {
  const { i18n } = useTranslation();

  return useQuery<IBackendResponse<Ipayment[]>, Error>({
    queryKey: [FAVORITE_GETALL, params, i18n.language],
    queryFn: () => paymentApis[favorite].getAll(params),
  });
};
export const useFavoriteDeleteMutation = (
  mutationOptions?: Partial<UseMutationOptions<IBackendResponse, Error, number>>
) =>
  useMutation<IBackendResponse, Error, number>({
    mutationKey: [FAVORITE_CREATE],
    mutationFn: (id) => paymentApis[favorite].delete(id),
    ...mutationOptions,
  });

// byAccaunt
export const useByAccauntCreateMutation = (
  mutationOptions?: Partial<
    UseMutationOptions<
      IBackendResponse<IPaymentCreateResponse>,
      Error,
      byAccountBody
    >
  >
) =>
  useMutation<IBackendResponse<IPaymentCreateResponse>, Error, byAccountBody>({
    mutationKey: [BY_ACCAUNT_CREATE],
    mutationFn: (data) => paymentApis[by_accaunt].create(data),
    ...mutationOptions,
  });
