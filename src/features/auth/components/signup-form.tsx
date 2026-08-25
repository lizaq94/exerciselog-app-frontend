'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SignupFormData, signupSchema } from '../schemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/shared/components/form/text-field';
import { useSignUp } from '../hooks/use-auth';
import { useRouter } from 'next/navigation';
import { getSignUpError } from '../errors';

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', username: '', confirmPassword: '' },
  });

  const { mutate, isPending } = useSignUp();

  const onSubmit = ({ email, password, username }: SignupFormData) => {
    mutate(
      { email, password, username },
      {
        onSuccess: () => {
          router.replace('/dashboard');
          router.refresh();
        },
        onError: (error) => {
          const { field, message } = getSignUpError(error);
          form.setError(field ?? 'root', { message }, { shouldFocus: field !== null });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="Enter email address"
          autoComplete="email"
        />
        <TextField
          control={form.control}
          name="username"
          type="text"
          label="Username"
          placeholder="Enter username"
          autoComplete="username"
        />
        <TextField
          control={form.control}
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          autoComplete="new-password"
        />
        <TextField
          control={form.control}
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Confirm your password"
          autoComplete="new-password"
        />
        {form.formState.errors.root && (
          <p role="alert" className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button className="mt-5" type="submit" disabled={isPending}>
          {isPending ? 'Signing up…' : 'Sign up'}
        </Button>
      </form>
    </Form>
  );
}
