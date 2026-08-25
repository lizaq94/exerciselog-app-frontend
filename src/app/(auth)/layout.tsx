export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full max-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="flex h-full w-full items-center md:px-5">{children}</div>
    </div>
  );
}
