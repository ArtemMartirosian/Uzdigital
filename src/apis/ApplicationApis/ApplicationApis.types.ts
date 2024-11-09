export interface IApplicationApisPayload {
  fio: string;
  phone_number: string;
  region: string;
  district: string;
  address: string;
}
export interface IApplicationApisResponse {
  fio: string;
  phone_number: string;
  region: string;
  district: string;
  address: string;
  status: number;
  id: number;
  created_at: string;
}
