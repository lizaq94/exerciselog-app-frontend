import { ChartColumn, Dumbbell, House, LucideIcon, Sparkles, User } from 'lucide-react';

export const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: House },
  { href: '/workouts', label: 'Workouts', icon: Dumbbell },
  { href: '/', label: 'AI Generator', icon: Sparkles },
  { href: '/', label: 'Stats', icon: ChartColumn },
  { href: '/', label: 'Profile', icon: User },
];

export function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
