import { PropsWithChildren, ReactElement } from 'react';
import { AuthProvider } from '@/common/components/providers/auth.provider';
import { auth } from '@/features/auth/lib/next-auth';
import { SwrProvider } from '@/common/components/providers/swr.provider';

export default async function PanelLayout({
  children,
}: PropsWithChildren): Promise<ReactElement> {
  const session = await auth();
  return (
    <SwrProvider>
      <AuthProvider user={session?.user}>{children}</AuthProvider>
    </SwrProvider>
  );
}
