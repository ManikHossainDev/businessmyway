import Cookies from 'js-cookie';

// Cookie options for security
const cookieOptions = {
  httpOnly: false, // Set to true if you want to prevent client-side access
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  sameSite: 'strict' as const, // Prevent CSRF attacks
  path: '/',
};

export const setToCookies = (key: string, value: string, options?: {}) => {
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
