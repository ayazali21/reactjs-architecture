import axios from 'axios';
import { env } from '@/config/env';
import { ApiError, type ApiErrorKind } from './api-error';

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10_000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function statusToKind(status?: number): ApiErrorKind {
  switch (status) {
    case 401: return 'unauthorized';
    case 403: return 'forbidden';
    case 404: return 'not_found';
    case 409: return 'conflict';
    default:
      if (status && status >= 500) return 'server';
      return 'unknown';
  }
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // no response at all — actual network failure, timeout, CORS block, backend down
      return Promise.reject(new ApiError('Unable to reach the server. Check your connection.', 'network'));
    }

    const status = error.response.status as number;
    const backendMessage = error.response.data?.error?.message as string | undefined;
    const kind = statusToKind(status);

    const fallbackMessages: Record<ApiErrorKind, string> = {
      network: 'Unable to reach the server.',
      validation: 'The data received was invalid.',
      not_found: 'The requested item was not found.',
      unauthorized: 'You need to sign in to do that.',
      forbidden: "You don't have permission to do that.",
      conflict: 'This conflicts with existing data.',
      server: 'Something went wrong on our end. Please try again.',
      unknown: 'An unexpected error occurred.',
    };

    return Promise.reject(new ApiError(backendMessage ?? fallbackMessages[kind], kind, status));
  },
);