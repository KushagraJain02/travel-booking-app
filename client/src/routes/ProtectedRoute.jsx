import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute -> loading:", loading);
  console.log("ProtectedRoute -> user:", user);

  // ⏳ Wait until auth is loaded
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role check (for admin)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
