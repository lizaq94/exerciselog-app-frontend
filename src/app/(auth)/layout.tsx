import { Dumbbell } from 'lucide-react';
import { AuthHeroPanel } from '@/app/(auth)/_components/AuthHeroPanel';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center">
        <div className="lg:hidden">
          <div>
            <Dumbbell />
          </div>
          <h1>ExerciseLog</h1>
          <p>Track your fitness journey</p>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <div className="hidden lg:flex">
        <AuthHeroPanel />
      </div>
    </div>
  );
}
