import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { AUTH_REFRESH, AUTH_SIGNIN, AUTH_SIGNUP } from "./urls";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // We will set withCredentials only for refresh calls explicitly
});

export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// ---------------------------
// Token refresh queue logic
// ---------------------------
let isRefreshing = false;
let pendingRequests: Array<(token: string | null) => void> = [];
let getAccessToken: (() => string | null) | null = null;
let setAccessToken: ((token: string, user?: any) => void) | null = null;

export function bindTokenAccessors(getter: () => string | null, setter: (token: string, user?: any) => void) {
  getAccessToken = getter;
  setAccessToken = setter;
}

async function requestRefreshToken(): Promise<string> {
  const res = await api.post(
    AUTH_REFRESH,
    {},
    { withCredentials: true } // send HttpOnly cookie
  );
  const { access_token } = res.data.data;
  if (!access_token) throw new Error("No access token in refresh response");
  if (setAccessToken) setAccessToken(access_token);
  setAuthToken(access_token);
  return access_token;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status = error.response?.status;

    const url = (originalRequest.url || "").toString();
    const isAuthEndpoint = url.endsWith(AUTH_REFRESH) || url.endsWith(AUTH_SIGNIN) || url.endsWith(AUTH_SIGNUP);

    const skipHeader = (originalRequest.headers as any)?.["X-RP-Skip-Refresh"];
    if (status === 401 && !originalRequest._retry && !skipHeader && !isAuthEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token) => {
            if (token) originalRequest.headers = { ...(originalRequest.headers || {}), Authorization: `Bearer ${token}` };
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const newToken = await requestRefreshToken();
        pendingRequests.forEach((cb) => cb(newToken));
        pendingRequests = [];
        return api(originalRequest);
      } catch (e) {
        pendingRequests.forEach((cb) => cb(null));
        pendingRequests = [];
        throw e;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

