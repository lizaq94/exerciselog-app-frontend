import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, login } from '../api';

export const authKeys = {
  all: ['user'] as const,
  me: ['user', 'me'] as const,
};

const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
  });
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => queryClient.setQueryData(authKeys.me, data),
  });
};

export { useCurrentUser, useLogin };
