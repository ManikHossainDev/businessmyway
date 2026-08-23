import Cookies from 'js-cookie';

// Cookie options for security
const cookieOptions = {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
  expires: 7,
};

export const setToCookies = (key: string, value: string, options?: Cookies.CookieAttributes) => {
  if (!key) {
    return;
  }
  const finalOptions = { ...cookieOptions, ...options };
  Cookies.set(key, value, finalOptions);
};

export const getFromCookies = (key: string) => {
  if (!key) {
    return null;
  }
  return Cookies.get(key) || null;
};

export const removeFromCookies = (key: string) => {
  if (!key) {
    return;
  }
  Cookies.remove(key, { path: '/' });
};
