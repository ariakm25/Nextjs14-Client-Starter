import { IUser } from '@/features/auth/types/auth.model';

export interface IAuthResponse
  extends Pick<IUser, 'id' | 'name' | 'email' | 'avatar'> {
  accessToken: string;
  refreshToken: string;
}
