import { LoginForm, LoginFormSkeleton } from '@/features/auth';
import { Suspense } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/shared/components/layout/page-header';

export const metadata = { title: 'Sign in' };

export default function Login() {
  return (
    <div className="bg-background px-4 font-sans">
      <PageHeader
        title="Sign in"
        description="Welcome back! Continue your fitness journey and crush your goals"
      />
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
      <Link className="block w-full text-center" href="/signup">
        {"Don't have an account? Sign up"}
      </Link>
    </div>
  );
}
