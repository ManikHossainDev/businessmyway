
import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/get-user-details-with-id?user_id=${id}`,
        method: "GET",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resitPassword: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password-in-settings`,
        method: "POST",
        body: data,
      }),
    }),

    verifyAccount: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/api/v1/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    GoogleLogin: builder.mutation({
      query: (data) => {
        console.log("Google login data:", data);
        return {
          url: `/auth/google`,
          method: "POST",
          body: data,
        };
      },
    }),
    GetAllServices: builder.query({
      query: () => ({
        url: `/api/v1/services`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResitPasswordMutation,
  useChangePasswordMutation,
  useVerifyEmailMutation,
  useVerifyAccountMutation,
  useGetSingleUserQuery,
  useGoogleLoginMutation,
  useGetAllServicesQuery,  
} = authApi;
