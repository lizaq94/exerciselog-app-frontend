import { LoginForm, LoginFormSkeleton } from '@/features/auth';
import { Suspense } from 'react';
import Link from 'next/link';

export const metadata = { title: 'Sign in' };

export default function Login() {
  return (
    <div className="bg-background px-4 font-sans">
      <header className="mb-10">
        <h2>Sign in</h2>
        <p className="text-muted-foreground">Go back to your plan - grow fast</p>
      </header>

      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
      <Link className="block w-full text-center" href="/signup">
        {"Don't have an account? Sign up"}
      </Link>
    </div>
  );
}
