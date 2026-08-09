import { isAxiosError } from 'axios';

export type ApiErrorBody = {
  apiVersion?: string;
  error?: { statusCode?: number; message?: string; timestamp?: string; path?: string };
};

export const ApiErrorMessages = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOO_MANY_REQUESTS: 'Too many attempts. Please wait a moment and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  GENERIC_ERROR: 'Something went wrong.',
  NETWORK_ERROR: 'Cannot connect to the server. Please try again.',
} as const;

export function getErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) return ApiErrorMessages.GENERIC_ERROR;
  if (!error.response) return ApiErrorMessages.NETWORK_ERROR;

  const { status, data } = error.response;

  if (status === 401) return ApiErrorMessages.INVALID_CREDENTIALS;
  if (status === 429) return ApiErrorMessages.TOO_MANY_REQUESTS;
  if (status >= 500) return ApiErrorMessages.SERVER_ERROR;

  const message = (data as ApiErrorBody | undefined)?.error?.message;
  if (typeof message === 'string' && message.trim()) return message;

  return ApiErrorMessages.GENERIC_ERROR;
}
