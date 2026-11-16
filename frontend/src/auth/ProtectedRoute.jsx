import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/ui/LoadingSpinner";
export default function ProtectedRoute() {
  const { user, loading, authError } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (authError) {
    return (
      <div role="alert" className="p-6 text-center text-red-600">
        Unable to verify your session. Please refresh.
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
