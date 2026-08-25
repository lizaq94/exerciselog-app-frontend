import Link from 'next/link';
import { SignUpForm } from '@/features/auth';
import { PageHeader } from '@/shared/components/layout/page-header';

export const metadata = { title: 'Sign up' };

export default function SignUp() {
  return (
    <div className="bg-background w-full px-4 font-sans">
      <PageHeader
        title="Sign up"
        description="Start your fitness journey today and unlock your potential"
      />
      <SignUpForm />
      <Link className="block w-full text-center" href="/login">
        Already have an account? Sign in!
      </Link>
    </div>
  );
}
