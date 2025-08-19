import { CustomError } from "@/types/custom-error.type";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const response = error?.response;
    const status = response?.status;
    const data = response?.data as { message?: string; errorCode?: string } | string | undefined;

    // Network/CORS/timeout errors have no response
    if (!response) {
      const customError: CustomError = {
        ...error,
        name: "NetworkError",
        message: error?.message || "Network error. Please check your connection.",
        errorCode: "NETWORK_ERROR",
      };
      return Promise.reject(customError);
    }

    // Handle unauthorized
    const isUnauthorized =
      status === 401 && (data === "Unauthorized" || (typeof data === "object" && (data as any)?.message === "Unauthorized"));
    if (isUnauthorized) {
      window.location.href = "/";
    }

    const message = typeof data === "string" ? data : data?.message || error?.message;
    const customError: CustomError = {
      ...error,
      message,
      errorCode: (typeof data === "object" ? (data as any)?.errorCode : undefined) || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default API;
