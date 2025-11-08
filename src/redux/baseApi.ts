import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),

  tagTypes: ["User", "Tour", "Division", "Booking"], //cash clear and cash dore rakhar jonnu
  endpoints: () => ({}),
});
