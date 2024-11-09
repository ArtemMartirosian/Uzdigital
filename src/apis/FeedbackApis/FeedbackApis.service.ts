import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { FEEDBACK_CREATE } from "../../constants/queryKeys";
import { feedback } from "../../constants/slugs";
import { IBackendResponse } from "../../types/IBackendResponse.type";
import request from "../config/axiosConfig";
import { IFeedbackApisPayload } from "./FeedbackApis.types";

const slug = feedback;

export const feedbackApis = {
  create: (feedbackPayload: IFeedbackApisPayload): Promise<IBackendResponse> =>
    request.post(slug, feedbackPayload),
};

export const useFeedbackCreateMutation = (
  mutationOptions?: Partial<
    UseMutationOptions<IBackendResponse, Error, IFeedbackApisPayload>
  >
) =>
  useMutation<IBackendResponse, Error, IFeedbackApisPayload>({
    mutationKey: [FEEDBACK_CREATE],
    mutationFn: (feedbackPayload) => feedbackApis.create(feedbackPayload),
    ...mutationOptions,
  });
