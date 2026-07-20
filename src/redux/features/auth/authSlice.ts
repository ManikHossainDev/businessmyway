/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getFromCookies, setToCookies, removeFromCookies } from "@/utils/cookies-storage";

export type TUser = {
  name: string;
  email: string;
  password: string;
  _id?: string;
  id: string;
};

// Define the type for the auth state
type TAuthState = {
  user: TUser | null;
  token: string | null;
};

// Initialize state from cookies if available
const getUserFromCookies = () => {
  const userCookie = getFromCookies('user');
  return userCookie ? JSON.parse(userCookie) : null;
};

const getTokenFromCookies = () => {
  return getFromCookies('token');
};

const initialState: TAuthState = {
  user: getUserFromCookies(),
  token: getTokenFromCookies(),
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      
      // Store user and token in cookies
      if (user) {
        setToCookies('user', JSON.stringify(user));
      }
      if (token) {
        setToCookies('token', token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Remove from cookies
      removeFromCookies('user');
      removeFromCookies('token');
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
// Selector to get the current user state
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

