import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { token, user } = useAppContext();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // If user is logged-in but pending, force them to complete profile
  const isPending = (user?.status || "").toUpperCase() === "PENDING";
  const isOnCompleteProfile = location.pathname === "/complete-profile";
  if (isPending && !isOnCompleteProfile) {
    return <Navigate to="/complete-profile" replace state={{ from: location }} />;
  }

  return children;
}

