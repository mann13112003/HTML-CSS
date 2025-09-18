import axios from "axios";
import Cookies from "js-cookie";
import { ROUTES } from "../constant/path.constants";
const API_SERVER = import.meta.env.VITE_API_SERVER;

export const api = axios.create({
  baseURL: API_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function handleLogoutAndRedirect(requestUrl: string) {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  if (requestUrl !== "/auth/login") {
    window.location.href = ROUTES.LOGIN;
  }
}

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
          handleLogoutAndRedirect(originalRequest.url);
        }
      } catch (error) {
        handleLogoutAndRedirect(originalRequest.url);
        console.error(error);
      }
    }
    return Promise.reject(error);
  }
);

export const logout = (data: string) => {
  return api.post("/auth/logout", data);
};
