import { isAxiosError } from 'axios';
import { ApiErrorBody, getErrorMessage } from '@/shared/lib/api-error';
import { SignupFormData } from './schemas';

type SignUpError =
  | { field: keyof SignupFormData; message: string }
  | { field: null; message: string };

const CONFLICT_MESSAGES = {
  email: 'Email already in use',
  username: 'Username is already taken',
} as const;

export function getSignUpError(error: unknown): SignUpError {
  if (isAxiosError(error) && error.response?.status === 409) {
    const message = (error.response?.data as ApiErrorBody | undefined)?.error?.message ?? '';
    const field = message.split(' ')[0];

    if (field === 'email' || field === 'username') {
      return { field, message: CONFLICT_MESSAGES[field] };
    }
    return { field: null, message: 'An account with these details already exists' };
  }

  return { field: null, message: getErrorMessage(error) };
}
