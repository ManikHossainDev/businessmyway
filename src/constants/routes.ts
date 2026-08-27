export const ADMIN_ROUTES = [
  "/admin-dashboard",
  "/adminProfile",
  "/settings",
  "/orders",
  "/inventory",
  "/category",
  "/products",
  "/admin-brands",
  "/admin-subscribers",
  "/admin-reviews",
  "/admin-users",
  "/admin-about-us",
  "/admin-contact-us",
  "/admin-privacy-policy",
  "/admin-terms-condition",
  "/admin-refundpolicy",
  "/admin-shippingpolicy",
];

export const USER_PRIVATE_ROUTES = [
  "/profile",
  "/orderhistory",
  "/addresses",
  "/changepass",
  "/order-success",
  "/wishlist",
  "/mywishlist",
];

export const SHARED_PRIVATE_ROUTES = [];

export const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/account-verify",
];

export const isPathMatch = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
