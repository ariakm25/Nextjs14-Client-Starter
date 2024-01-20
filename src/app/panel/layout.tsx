import { PropsWithChildren, ReactElement } from 'react';
import { AuthProvider } from '@/common/components/providers/auth.provider';
import { auth } from '@/features/auth/lib/next-auth';

export default async function PanelLayout({
  children,
}: PropsWithChildren): Promise<ReactElement> {
  const session = await auth();
  return <AuthProvider user={session?.user}>{children}</AuthProvider>;
}
