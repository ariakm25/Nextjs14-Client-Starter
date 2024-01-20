import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { IUser } from '@/features/auth/types/auth.model';

export interface AuthState {
  user?: IUser | null;
  setUser: (_user: IUser) => void;
}

export const useAuthSlice = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: IUser) => set({ user }),
  }))
);
