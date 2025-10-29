import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function parseQuery(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const out: Record<string, string> = {};
  params.forEach((v, k) => (out[k] = v));
  return out;
}

function decodeJwtSub(token: string): string | null {
  try {
    const [, payload] = token.split(".");
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = atob(padded);
    const data = JSON.parse(json);
    return typeof data.sub === "string" ? data.sub : null;
  } catch {
    return null;
  }
}

export default function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAppContext();

  useEffect(() => {
    const { token, firstName, lastName } = parseQuery(location.search);
    if (token) {
      const username = decodeJwtSub(token) || "";
      setAuth(token, { username, firstName: firstName || "", lastName: lastName || "" });
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
  }, [location.search, navigate, setAuth]);

  return null;
}
