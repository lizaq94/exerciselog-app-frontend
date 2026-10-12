'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLogout } from '@/features/auth';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  const { mutate, isPending } = useLogout();

  const handleLogout = () => {
    mutate(undefined, {
      onSettled: () => {
        window.location.replace('/login');
      },
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="text-nav-icon hover:text-foreground flex items-center justify-center rounded-md p-4 transition-colors dark:hover:text-white"
        >
          <LogOut className="size-6" aria-hidden />
          <span className="sr-only">Logout</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">Logout</TooltipContent>
    </Tooltip>
  );
}
