'use client';

import { PropsWithChildren } from 'react';
import { useAuthSlice } from '@/features/auth/auth.slice';
import { IUser } from '@/features/auth/types/auth.model';

export const AuthProvider = ({
  user,
  children,
}: PropsWithChildren<{ user?: IUser }>) => {
  const authSlice = useAuthSlice();
  if (authSlice.user === null && user && user !== authSlice.user) {
    authSlice.setUser(user);
  }

  return children;
};
