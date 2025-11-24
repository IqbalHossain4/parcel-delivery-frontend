import { Navigate } from "react-router";
import type { ComponentType } from "react";
import type { TRole } from "../types";
import { useUserInfoQuery } from "../redux/features/auth/auth.api";

export const withAuth = (Component: ComponentType, role: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/signin" />;
    }

    if (!role && !isLoading && role !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
