import { useQuery } from "@tanstack/react-query";
import { faq } from "../constants/slugs";
import { IBackendResponse } from "../types/IBackendResponse.type";
import request from "./config/axiosConfig";

interface IFAQGetAllResponse {
  answer: string;
  id: 36;
  question: string;
}

const slug = faq;

export const faqApis = {
  getAll: (): Promise<IBackendResponse<IFAQGetAllResponse[]>> => {
    return request.get(slug);
  },
};

export const useFaqGetAllQuery = () => {
  return useQuery<IBackendResponse<IFAQGetAllResponse[]>, Error>({
    queryKey: ["FAQ_GETALL"],
    queryFn: () => faqApis.getAll(),
  });
};
