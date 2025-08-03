import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TUser } from "../session/authData";
import { Role } from "../utils/roles-nav";
import Layout from "./Layout";
import AdminDashboard from "./Admin/components/dash";
import DashboardHome from "./user/ui/DashboardHome";

interface Props {
  children?: React.ReactNode;
}

const UnifiedDashboard: React.FC<Props> = ({ children }) => {
 const authState = useSelector((state: RootState) => state.auth.user);
 const user = authState?.data.user;
 const userId = user?.userId;

  if (!user?.role) {
    return <Layout>Unauthorized</Layout>;
  }

  if (children) {
    return <Layout>{children}</Layout>;
  }

  return (
    <Layout>
      {user.role === Role.ADMIN || user.role === Role.SUPERADMIN ? (
        <AdminDashboard />
      ) : (
        <DashboardHome />
      )}
    </Layout>
  );
};

export default UnifiedDashboard;
