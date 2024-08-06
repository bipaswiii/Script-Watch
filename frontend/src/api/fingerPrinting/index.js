import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../config/constant";

export const fingerPrintingApi = createApi({
  reducerPath: "fingerPrintingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  tagTypes: ["listScript"],

  endpoints: (builder) => ({
    detectFingerprint: builder.mutation({
      query: (body) => {
        return {
          url: `/finger-printing`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["listScript"],
    }),

    detailScript: builder.query({
      query: () => {
        return {
          url: `/finger-printing`,
          method: "GET",
        };
      },
      providesTags: ["listScript"],
    }),
  }),
});

export const { useDetectFingerprintMutation, useDetailScriptQuery } =
  fingerPrintingApi;
