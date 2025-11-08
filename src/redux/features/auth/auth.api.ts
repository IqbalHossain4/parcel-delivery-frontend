import { ISignup } from "./../../../types/auth.type";
import type { IResponse } from "../../../types";
import type { ISignin } from "../../../types/auth.type";
import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<IResponse<null>, ISignin>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
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
  }),
});

export const { useSigninMutation, useSignoutMutation, useSignupMutation } =
  authApi;
