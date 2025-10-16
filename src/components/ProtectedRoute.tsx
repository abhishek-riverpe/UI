import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { token } = useAppContext();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}

