export const resolveMediaUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";
  const origin = apiBase.replace(/\/api\/v\d+\/?$/, "").replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${origin}${path}`;
};

export const formatJoinDate = (value?: string | Date | null): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
