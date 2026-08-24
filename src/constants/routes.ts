export const ADMIN_ROUTES = [
  "/admin-dashboard",
  "/adminProfile",
  "/settings",
  "/orders",
  "/inventory",
  "/category",
  "/admin-brands",
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
  "/wishlist",
];

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
