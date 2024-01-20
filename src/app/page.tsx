'use client';

import { Button } from '@/common/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/auth/login'}>
        <Button variant="default" size="lg" className="mb-8">
          LOGIN
        </Button>
      </Link>
    </main>
  );
}
