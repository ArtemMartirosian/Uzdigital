import { useQuery } from "@tanstack/react-query";
import { instructions } from "../constants/slugs";
import { IBackendResponse } from "../types/IBackendResponse.type";
import request from "./config/axiosConfig";

interface IInstructionsGetAllResponse {
  id: number;
  title: string;
  content: null;
  file: string;
  type: number;
  order_num: number;
  status: number;
}

const slug = instructions;

export const instructionsApis = {
  getAll: (): Promise<IBackendResponse<IInstructionsGetAllResponse[]>> => {
    return request.get(slug);
  },
};

export const useInstructionsGetAllQuery = () => {
  return useQuery<IBackendResponse<IInstructionsGetAllResponse[]>, Error>({
    queryKey: ["INSTRUCTIONS_GETALL"],
    queryFn: () => instructionsApis.getAll(),
  });
};
