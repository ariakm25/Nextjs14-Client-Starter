'use client';

import { useAuthSlice } from '@/features/auth/auth.slice';
import { Button } from '@/common/components/ui/button';
import { signOut } from 'next-auth/react';

export default function AdminPage() {
  const { user } = useAuthSlice();
  return (
    <div>
      <h1>ADMIN ONLY</h1>
      <h2>
        HELLO Name: {user?.name} Role: {user?.role?.name}
      </h2>
      <div>
        <Button onClick={() => signOut()} variant="default">
          Logout
        </Button>
      </div>
    </div>
  );
}
