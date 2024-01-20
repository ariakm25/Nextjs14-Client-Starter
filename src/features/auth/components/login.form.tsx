'use client';

import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { useForm } from 'react-hook-form';
import { ILoginSchema, LoginSchema } from '@/features/auth/types/auth.request';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { signIn } from 'next-auth/react';
import { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/common/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function LoginForm(): ReactElement {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const loginForm = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginFormHandleSubmit = async (values: ILoginSchema) => {
    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/panel/admin',
    });

    if (res?.ok === false) {
      loginForm.setError('email', {
        type: 'manual',
        message: res?.error ?? 'Something went wrong',
      });

      return false;
    }
  };

  return (
    <Form {...loginForm}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error ?? 'Something went wrong'}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={loginForm.handleSubmit(loginFormHandleSubmit)}
        className="space-y-8"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
