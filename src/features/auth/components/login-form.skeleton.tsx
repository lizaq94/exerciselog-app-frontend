'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function LoginFormSkeleton() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-14 w-full" />
      <Skeleton className="mt-5 h-9 w-full" />
    </div>
  );
}
