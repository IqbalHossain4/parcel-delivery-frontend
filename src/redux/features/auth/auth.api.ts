import type { IResponse } from "../../../types";
import type {
  ISendOTP,
  ISignin,
  ISignup,
  IVerifyOTP,
} from "../../../types/auth.type";
import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<IResponse<null>, ISignin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    signup: builder.mutation<IResponse<null>, ISignup>({
      query: (userInfo) => ({
        url: "user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    sendOTP: builder.mutation<IResponse<null>, ISendOTP>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/user/allUser",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignoutMutation,
  useSignupMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useUserInfoQuery,
  useGetAllUsersQuery,
} = authApi;
