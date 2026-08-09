'use client';

import { useEffect } from 'react';
import { setOnSessionExpired } from '@/api/client';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export function SessionExpiredProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setOnSessionExpired(() => {
      const current = window.location.pathname + window.location.search;
      queryClient.cancelQueries();
      queryClient.clear();
      router.replace(`/login?reason=session_expired&redirectTo=${encodeURIComponent(current)}`);
    });

    return () => setOnSessionExpired(null);
  }, [queryClient, router]);
  return <>{children}</>;
}
