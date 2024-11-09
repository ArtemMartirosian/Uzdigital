import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { MEDIA_CREATE } from "../../constants/queryKeys";
import { media } from "../../constants/slugs";
import request from "../config/axiosConfig";
import { IBackendResponse } from "../../types/IBackendResponse.type";

const slug = media;

export const mediaApis = {
  create: (data: FormData): Promise<IBackendResponse<string[]>> =>
    request.post(slug, data),
};

export const useMediaCreateMutation = (
  mutationOptions?: Partial<
    UseMutationOptions<IBackendResponse<string[]>, Error, FormData>
  >
) =>
  useMutation<IBackendResponse<string[]>, Error, FormData>({
    mutationKey: [MEDIA_CREATE],
    mutationFn: (data: FormData): Promise<IBackendResponse<string[]>> =>
      mediaApis.create(data),
    ...mutationOptions,
  });
