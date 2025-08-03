import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Role } from "../utils/roles-nav";
import { getRedirectPath } from "../utils/redirect";
import { TUser } from "../session/authData";

interface Props {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const authState = useSelector(
    (state: RootState) => state.auth.user
  );
   const user = authState?.data.user;
   const userId = user?.userId;

  if (!userId) {
    return <Navigate to="/signIn" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role as Role)) {
    return <Navigate to={getRedirectPath(user.role)} />;
  }

  return <>{children}</>;
};

// Reusable role-based routes
export const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={[Role.ADMIN, Role.SUPERADMIN]}>
    {children}
  </ProtectedRoute>
);

export const MemberRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={[Role.MEMBER, Role.ELDER]}>
    {children}
  </ProtectedRoute>
);

export const AuthenticatedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ProtectedRoute
    allowedRoles={[Role.ADMIN, Role.SUPERADMIN, Role.MEMBER, Role.ELDER]}
  >
    {children}
  </ProtectedRoute>
);
