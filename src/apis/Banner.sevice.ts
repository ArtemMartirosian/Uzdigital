import { useQuery } from "@tanstack/react-query";
import { IBackendResponse } from "../types/IBackendResponse.type";
import request from "./config/axiosConfig";
import { banners } from "../constants/slugs";

interface IBannerGetAllResponse {
  id: number;
  image: string;
  order_num: number;
  status: number;
  title: string;
  url: string;
}

const slug = banners;

export const bannerApis = {
  getAll: (): Promise<IBackendResponse<IBannerGetAllResponse[]>> => {
    return request.get(slug);
  },
};

export const useBannerGetAllQuery = () => {
  return useQuery<IBackendResponse<IBannerGetAllResponse[]>, Error>({
    queryKey: ["BANNER_GETALL"],
    queryFn: () => bannerApis.getAll(),
  });
};
