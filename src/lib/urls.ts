export const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Auth endpoints
export const AUTH_SIGNIN = "/api/v1/auth/signin";
export const AUTH_SIGNUP = "/api/v1/auth/signup";
export const AUTH_REFRESH = "/api/v1/auth/refresh";
export const AUTH_LOGOUT = "/api/v1/auth/logout";

// Zynk endpoints
export const ZYNK_CREATE_ENTITY = "/api/v1/zynk/entity";
export const DEFAULT_ROUTING_ID = "infrap_20af8d0c_8b78_47bb_8c04_941c8770e1ae"
export const ZYNK_KYC_REQUIREMENTS = (routingId: string) => `/api/v1/zynk/kyc/requirements/${routingId}`;

