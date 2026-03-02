import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { parseISO } from 'date-fns/parseISO';
import { format } from 'date-fns/format';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: string) {
  const parseDate = parseISO(date);

  return format(parseDate, 'dd MMM yyyy');
}

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  if (duration < 60) return `${seconds}s`;
  if (duration >= 60 && duration < 3600)
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}
