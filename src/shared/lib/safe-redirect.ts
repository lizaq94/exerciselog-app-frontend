export function safeRedirect(url: string | null) {
  if (url && /^\/(?!\/)[^\\\s]*$/.test(url)) return url;
  return '/dashboard';
}
