export const isAdminRole = (role?: string | null) => {
  if (!role) return false;
  const normalized = role.replace(/[_\s-]/g, "").toLowerCase();
  return normalized === "superadmin" || normalized === "admin";
};
