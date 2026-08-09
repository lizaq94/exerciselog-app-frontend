'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { type LoginFormData, loginSchema } from '../schemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/shared/components/form/text-field';
import { useLogin } from '../hooks/use-auth';
import { getErrorMessage } from '@/shared/lib/api-error';
import { useRouter, useSearchParams } from 'next/navigation';
import { safeRedirect } from '@/shared/lib/safe-redirect';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const searchParams = useSearchParams();
  const target = searchParams.get('redirectTo');
  const reason = searchParams.get('reason');

  const { mutate, isPending } = useLogin();

  const onSubmit = (values: LoginFormData) => {
    mutate(values, {
      onSuccess: () => {
        router.replace(safeRedirect(target));
        router.refresh();
      },
      onError: (error) => {
        form.setError('root', { message: getErrorMessage(error) });
      },
    });
  };

  useEffect(() => {
    if (reason === 'session_expired') {
      toast.info('Your session has expired. Please log in again.', {
        id: 'session-expired',
      });
    }
  }, [reason]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField control={form.control} name="email" type="email" label="Email" />
        <TextField control={form.control} name="password" type="password" label="Password" />
        {form.formState.errors.root && (
          <p role="alert" className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button className="mt-5" type="submit" disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </Form>
  );
}
