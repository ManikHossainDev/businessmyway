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
import "./features/products/productApi";
import "./features/wishlist/wishlistApi";
import "./features/cart/cartApi";
import "./features/orders/orderApi";
import "./features/notifications/notificationApi";
import "./features/reviews/reviewApi";
import "./features/dashboard/dashboardApi";

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
