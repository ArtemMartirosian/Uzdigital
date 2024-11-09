import { IPrice } from "../../types/types";

export type kindergartenType = "public" | "private" | "";

export interface kindergartensGetaAllParams {
  search: string;
  page: number;
  limit: number;
  regionId?: string;
  property?: string;
}

export interface IKindergarten {
  id: number;
  name: string;
  images: string;
  address: string;
  property: kindergartenType;
  region_id: number;
  status: number;
  personal_account: string;
  pay_external_service_id: number;
  pay_client_id: number;
  created_at: string;
  updated_at: string;
}

export interface IKindergartensGetAllResponse {
  kindergartens: IKindergarten[];
  lastPayedKindergartens: IKindergarten[];
}

export interface IKindergartensGetOneResponse {
  id: number;
  kindergarten_id: number;
  name: string;
  images: string;
  address: string;
  property: kindergartenType;
  region_id: number;
  status: number;
  personal_account: string;
  pay_external_service_id: number;
  pay_client_id: number;
  created_at: string;
  updated_at: string;
  prices: IPrice[];
  kindergartens: {
    name: string;
    address: string;
  };
  favorite_transactions: null | {
    id: number;
    created_at: string;
  };
  amount: number;
  desc: string;
  user_id: number;
  payment_status: string;
  tin: string;
}

export interface kidergaternsType {
  value: string;
  label: string;
}
