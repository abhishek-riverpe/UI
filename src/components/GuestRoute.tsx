import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function GuestRoute({ children }: { children: ReactElement }) {
  const { token } = useAppContext();
  if (token) return <Navigate to="/dashboard" replace />;
  return children;
}

