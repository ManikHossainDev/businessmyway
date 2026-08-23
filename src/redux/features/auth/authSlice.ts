/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getFromCookies, setToCookies, removeFromCookies } from "@/utils/cookies-storage";

export type TUser = {
  name: string;
  email: string;
  password?: string;
  _id?: string;
  id: string;
  phone?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
  refreshToken: string | null;
  forgotPassToken: string | null;
  resetToken: string | null;
};

const parseUserCookie = () => {
  const userCookie = getFromCookies("user");
  if (!userCookie) return null;
  try {
    return JSON.parse(userCookie);
  } catch {
    return null;
  }
};

const initialState: TAuthState = {
  user: parseUserCookie(),
  token: getFromCookies("token"),
  refreshToken: getFromCookies("refreshToken"),
  forgotPassToken: getFromCookies("forgotPassToken"),
  resetToken: getFromCookies("resetToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, refreshToken } = action.payload;

      if (user) {
        state.user = user;
        setToCookies("user", JSON.stringify(user));
      }

      if (token) {
        state.token = token;
        setToCookies("token", token);
        state.forgotPassToken = null;
        state.resetToken = null;
        removeFromCookies("forgotPassToken");
        removeFromCookies("resetToken");
      }

      if (refreshToken) {
        state.refreshToken = refreshToken;
        setToCookies("refreshToken", refreshToken);
      }
    },
    setForgotPassToken: (state, action) => {
      state.forgotPassToken = action.payload;
      if (action.payload) {
        setToCookies("forgotPassToken", action.payload);
      } else {
        removeFromCookies("forgotPassToken");
      }
    },
    setResetToken: (state, action) => {
      state.resetToken = action.payload;
      if (action.payload) {
        setToCookies("resetToken", action.payload);
      } else {
        removeFromCookies("resetToken");
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.forgotPassToken = null;
      state.resetToken = null;
      removeFromCookies("user");
      removeFromCookies("token");
      removeFromCookies("refreshToken");
      removeFromCookies("forgotPassToken");
      removeFromCookies("resetToken");
    },
  },
});

export const { setUser, setForgotPassToken, setResetToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectForgotPassToken = (state: RootState) => state.auth.forgotPassToken;
export const selectResetToken = (state: RootState) => state.auth.resetToken;
