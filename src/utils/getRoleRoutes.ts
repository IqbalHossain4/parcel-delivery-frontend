import { role } from "../constant/role";
import { adminRoutes } from "../routes/adminRoutes";
import type { TRole } from "../types";

export const getRoleRoutes = (userRole: TRole) => {
  switch (userRole) {
    case role.admin:
      return [...adminRoutes];
    case role.sender:
      return [...adminRoutes];
    case role.receiver:
      return [...adminRoutes];
    default:
      return [];
  }
};
