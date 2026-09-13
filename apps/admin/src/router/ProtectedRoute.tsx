import { Navigate, Outlet } from "react-router-dom";
import { useAuth, useProfile } from "@repo/api";

export default function ProtectedRoute() {
  const { user, loading: authLoading } = useAuth();

  const {
    data: profile,
    isLoading: profileLoading,
  } = useProfile();

  if (authLoading || profileLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}