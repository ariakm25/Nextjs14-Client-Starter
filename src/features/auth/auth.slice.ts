import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { IUser } from '@/features/auth/types/auth.model';

export interface IAuthState {
  user?: IUser | null;
  setUser: (_user: IUser) => void;
}

export const useAuthSlice = create<IAuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: IUser) => set({ user }),
  }))
);
