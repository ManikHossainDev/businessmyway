import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import "./features/auth/authApi";
import "./features/Profile/Profile";
import "./features/settings/settingsApi";
import "./features/category/categoryApi";
import "./features/brands/brandApi";
import "./features/subscribers/subscriberApi";
import "./features/user/userApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
