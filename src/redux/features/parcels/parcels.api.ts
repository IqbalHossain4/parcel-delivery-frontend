import type { IResponse } from "../../../types";
import type { IParcel } from "../../../types/parcels.type";
import { baseApi } from "../../baseApi";

export const parcelsApit = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createParcels: builder.mutation<IResponse<null>, IParcel>({
      query: (parcelsData) => ({
        url: "/parcels",
        method: "POST",
        data: parcelsData,
      }),
      invalidatesTags: ["Parcel"],
    }),
    getMyParcels: builder.query({
      query: () => ({
        url: "/parcels/me",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    getAllParcels: builder.query({
      query: () => ({
        url: "/parcels/all-parcels",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    getParcel: builder.query({
      query: (id) => ({
        url: `/parcels/${id}`,
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),
  }),
});

export const {
  useGetMyParcelsQuery,
  useGetAllParcelsQuery,
  useGetParcelQuery,
  useCreateParcelsMutation,
} = parcelsApit;
