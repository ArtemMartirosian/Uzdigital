import { useQuery } from "@tanstack/react-query";
import { contacts } from "../constants/slugs";
import { IBackendResponse } from "../types/IBackendResponse.type";
import request from "./config/axiosConfig";

interface IContactsGetAllResponse {
  id: number;
  type: number;
  value: string;
}

const slug = contacts;

export const contactsApis = {
  getAll: (): Promise<IBackendResponse<IContactsGetAllResponse[]>> => {
    return request.get(slug);
  },
};

export const useContactsGetAllQuery = () => {
  return useQuery<IBackendResponse<IContactsGetAllResponse[]>, Error>({
    queryKey: ["CONTACTS_GETALL"],
    queryFn: () => contactsApis.getAll(),
  });
};
