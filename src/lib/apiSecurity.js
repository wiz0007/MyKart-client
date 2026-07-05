import axios from "axios";

export const API_BASE = "https://my-kart-server-3.onrender.com";

const CSRF_HEADER = "X-CSRF-Token";
const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

let csrfToken = null;
let csrfRequest = null;
let refreshRequest = null;

export const clearCsrfToken = () => {
  csrfToken = null;
  delete axios.defaults.headers.common[CSRF_HEADER];
};

export const getCsrfToken = async () => {
  if (csrfToken) return csrfToken;

  if (!csrfRequest) {
    csrfRequest = axios
      .get(`${API_BASE}/api/auth/csrf`, { withCredentials: true, skipCsrf: true })
      .then((res) => {
        const nextToken = res.data?.csrfToken;
        if (!nextToken) throw new Error("Missing CSRF token");

        csrfToken = nextToken;
        axios.defaults.headers.common[CSRF_HEADER] = nextToken;
        return nextToken;
      })
      .finally(() => {
        csrfRequest = null;
      });
  }

  return csrfRequest;
};

const shouldRefreshSession = (error, originalRequest) => {
  if (error.response?.status !== 401 || !originalRequest || originalRequest._authRetry) {
    return false;
  }

  const url = originalRequest.url || "";
  return (
    !originalRequest.skipAuthRefresh &&
    !url.includes("/api/auth/login") &&
    !url.includes("/api/auth/register") &&
    !url.includes("/api/auth/google") &&
    !url.includes("/api/auth/refresh")
  );
};

const refreshSession = async () => {
  if (!refreshRequest) {
    refreshRequest = axios
      .post(`${API_BASE}/api/auth/refresh`, {}, { withCredentials: true, skipAuthRefresh: true })
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
  const method = (config.method || "get").toLowerCase();

  if (unsafeMethods.has(method) && !config.skipCsrf) {
    const token = await getCsrfToken();
    config.headers = config.headers || {};
    config.headers[CSRF_HEADER] = token;
  }

  config.withCredentials = true;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      error.response?.data?.msg === "Invalid CSRF token" &&
      originalRequest &&
      !originalRequest._csrfRetry
    ) {
      clearCsrfToken();
      originalRequest._csrfRetry = true;

      const token = await getCsrfToken();
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers[CSRF_HEADER] = token;

      return axios(originalRequest);
    }

    if (shouldRefreshSession(error, originalRequest)) {
      originalRequest._authRetry = true;
      await refreshSession();
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);
