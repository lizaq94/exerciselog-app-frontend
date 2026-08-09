import { Dumbbell } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full max-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="w-full md:px-5">
        <header className="flex flex-col items-center justify-center gap-4 pt-10 pb-14">
          <Dumbbell />
          <h1 className="text-center">Exercise log</h1>
        </header>
        {children}
      </div>
    </div>
  );
}
