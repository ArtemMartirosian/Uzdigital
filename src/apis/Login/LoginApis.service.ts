import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import request from "../config/axiosConfig";
import { IBackendResponse } from "../../types/IBackendResponse.type";
import { logintBody, ILoginResponse } from "./LoginApis.types.tsx";
import {login, otpSend} from "../../constants/slugs";

// API Service to handle login
export const loginService = {
    login: (data: logintBody): Promise<IBackendResponse<ILoginResponse>> =>
        request.post(login, data),
};

// React Query Mutation Hook for login
export const useLoginMutation = (
    mutationOptions?: Partial<
        UseMutationOptions<IBackendResponse<ILoginResponse>, Error, logintBody>
    >
) =>
    useMutation<IBackendResponse<ILoginResponse>, Error, logintBody>({
        mutationKey: ["login"],
        mutationFn: (data) => loginService.login(data),
        ...mutationOptions,
    });


export const otpService = {
    sendOtp: (data: logintBody): Promise<IBackendResponse<null>> =>
        request.post(otpSend, data),
};

// React Query Mutation Hook for OTP sending
export const useOtpSendMutation = (
    mutationOptions?: Partial<
        UseMutationOptions<IBackendResponse<null>, Error, logintBody>
    >
) =>
    useMutation<IBackendResponse<null>, Error, logintBody>({
        mutationKey: ["otpSend"],
        mutationFn: (data) => otpService.sendOtp(data),
        ...mutationOptions,
    });