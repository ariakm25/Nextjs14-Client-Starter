'use client';

import { useAuthSlice } from '@/features/auth/auth.slice';
import { signOut } from 'next-auth/react';
import { Button } from '@/common/components/ui/button';

export default function UserPage() {
  const { user } = useAuthSlice();
  return (
    <div>
      <h1>USER ONLY</h1>
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
