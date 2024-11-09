import { IPrice } from "../../types/types";

export interface Ipayment {
  id: number;
  kindergarten_id: number;
  name: string;
  images: string;
  address: string;
  region_id: number;
  status: number;
  personal_account: string;
  pay_external_service_id: number;
  pay_client_id: number;
  created_at: string;
  updated_at: string;
  prices: {
    label: string;
    amount: number;
  }[];
  kindergartens: {
    name: string;
    address: string;
    images: string;
    property: "public" | "private" | "";
  };
  favorite_transactions: {
    id: number;
    created_at: string;
  };
  amount: number;
  user_id: number;
  desc: string;
  tin: string;
  payment_status: string;
  processing_id: string;
  gnk_fields: string;
  uzdigital_login: string;
}

export interface IFavorite {
  id: number;
  kindergarten_id: number;
  name: string;
  images: string;
  address: string;
  region_id: number;
  status: number;
  personal_account: string;
  pay_external_service_id: number;
  pay_client_id: number;
  prices: IPrice[];
  kindergartens: {
    name: string;
    address: string;
  };
  favorite_transactions: {
    id: number;
    created_at: string;
  };
  payment_status: string;
  amount: number;
  user_id: number;
  desc: string;
  created_at: string;
  updated_at: string;
  tin: string;
  uzdigital_login: string;
}
export interface paymentBody {
  uzdigitalLogin: string;
  amount: number;
}

export interface byAccountBody {
  description: string;
  prices: IPrice[];
  tin?: string;
  personalAccount: string;
}

export interface IFavoriteBody {
  transactionId: number;
}

export interface IPaymentCreateResponse {
  id: number;
  link: string;
  fio: string;
  balance: string;
}
