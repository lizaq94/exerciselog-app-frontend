import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL && typeof window !== 'undefined') {
  throw new Error(
    'NEXT_PUBLIC_API_URL environment variable is not defined. Check your .env.local file.',
  );
}

let onSessionExpired: (() => void) | null = null;

export function setOnSessionExpired(callback: () => void) {
  onSessionExpired = callback;
}

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (reason: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const skipPaths = ['/auth/refresh', '/auth/login', '/auth/signup'];
    if (skipPaths.some((path) => originalRequest.url?.includes(path))) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => apiClient(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await apiClient.post('/auth/refresh');
      processQueue(null);
      return apiClient(originalRequest);
    } catch (refreshError) {
      const axiosErr =
        refreshError instanceof AxiosError
          ? refreshError
          : new AxiosError(
              refreshError instanceof Error ? refreshError.message : 'Token refresh failed',
            );
      processQueue(axiosErr);

      if (onSessionExpired) {
        onSessionExpired();
      } else if (typeof window !== 'undefined') {
        window.location.href = '/login?reason=session_expired';
      }
      return Promise.reject(axiosErr);
    } finally {
      isRefreshing = false;
    }
  },
);

export default apiClient;
