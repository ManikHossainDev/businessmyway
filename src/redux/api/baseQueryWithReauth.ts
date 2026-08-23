"use client";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logout, setUser } from "../features/auth/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const auth = (
      getState() as {
        auth: { token?: string | null; resetToken?: string | null };
      }
    ).auth;
    const rawToken = endpoint === "resitPassword" ? auth.resetToken : auth.token;
    const token = rawToken?.replace(/['"]+/g, "");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const skipRefreshEndpoints = new Set([
  "login",
  "register",
  "forgetPassword",
  "verifyAccount",
  "verifyEmail",
  "resendOtp",
  "refreshToken",
  "resitPassword",
  "getPublicSetting",
  "submitContact",
]);

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401 || skipRefreshEndpoints.has(api.endpoint)) {
    return result;
  }

  const refreshToken = (
    api.getState() as { auth: { refreshToken?: string | null } }
  ).auth.refreshToken;
  if (!refreshToken) {
    api.dispatch(logout());
    return result;
  }

  const refreshResult = await rawBaseQuery(
    {
      url: "/auth/refresh-token",
      method: "POST",
      body: { refreshToken },
    },
    api,
    extraOptions,
  );

  const payload = refreshResult.data as {
    data?: {
      user?: unknown;
      tokens?: { accessToken?: string; refreshToken?: string };
    };
  } | undefined;

  const accessToken = payload?.data?.tokens?.accessToken;
  if (!accessToken) {
    api.dispatch(logout());
    return result;
  }

  api.dispatch(
    setUser({
      user: payload?.data?.user,
      token: accessToken,
      refreshToken: payload?.data?.tokens?.refreshToken,
    }),
  );

  result = await rawBaseQuery(args, api, extraOptions);
  return result;
};
