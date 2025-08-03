// utils/redirect.ts
import { Role } from "./roles-nav";

export const getRedirectPath = (role: string): string => {
  switch (role) {
    case Role.ADMIN:
    case Role.SUPERADMIN:
      return "/dashboard/admin";
    case Role.MEMBER:
    case Role.ELDER:
      return "/member/dashboard";
    default:
      return "/signIn";
  }
};
