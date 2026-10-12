'use client';

import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BicepsFlexed } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { isActiveRoute, navItems } from '@/app/(dashboard)/_components/nav-items';
import { LogoutButton } from '@/features/auth';

export function SidebarRail() {
  const pathname = usePathname();

  return (
    <nav className="bg-nav-bg flex h-full w-20 flex-col items-center gap-20">
      <Link href="/" className="text-nav-icon mt-5 flex items-center justify-center p-2">
        <BicepsFlexed className="size-8" aria-hidden />
      </Link>
      <div className="flex w-full flex-col items-center gap-4">
        {navItems.map((item) => {
          const active = isActiveRoute(pathname, item.href);

          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className="text-nav-icon hover:text-foreground aria-[current=page]:bg-lime/20 aria-[current=page]:text-lime flex items-center justify-center rounded-md p-4 transition-colors dark:hover:text-white"
                  aria-current={active ? 'page' : undefined}
                >
                  <item.icon className="size-6" aria-hidden />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <div className="mt-auto mb-5">
        <LogoutButton />
      </div>
    </nav>
  );
}
