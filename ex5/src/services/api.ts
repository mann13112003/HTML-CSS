import axios from "axios";
import type { UserLogin } from "../types/validate.type";
import Cookies from "js-cookie";
import { ROUTES } from "../constant/path.constants";
const API_URL = import.meta.env.VITE_API_URL;
const API_SERVER = import.meta.env.VITE_API_SERVER;

export const api = axios.create({
  baseURL: API_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest.url !== "/auth/refresh-token"
    ) {
      try {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          const res = await api.post(
            "/auth/refresh-token",
            { refreshToken },
            {
              headers: { Authorization: undefined },
            }
          );
          const newToken = res.data.data.accessToken;
          Cookies.set("accessToken", newToken);

          error.config.headers.Authorization = `Bearer ${newToken}`;
          return api.request(originalRequest);
        } else {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = ROUTES.LOGIN;
        }
      } catch (error) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = ROUTES.LOGIN;
        console.error(error);
      }
    }
    return Promise.reject(error);
  }
);

export const login = (data: UserLogin) => {
  return api.post("/auth/login", data);
};

export const logout = (data: string) => {
  return api.post("/auth/logout", data);
};

export const getProfile = () => {
  return api.get("/auth/profile");
};

interface ApiRequest<TBody = unknown> {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: TBody;
}

export const apiRequest = async <TResponse, TBody = unknown>({
  path,
  method,
  body,
}: ApiRequest<TBody>): Promise<TResponse> => {
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (body) {
      if (method === "GET") {
        const queryString = new URLSearchParams(
          body as Record<string, string>
        ).toString();
        path += `?${queryString}`;
      }
      options.body = JSON.stringify(body);
    }
    const res = await fetch(`${API_URL}${path}`, options);
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);
    const data = (await res.json()) as TResponse;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
