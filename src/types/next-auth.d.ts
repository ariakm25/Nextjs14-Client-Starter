import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';
import { IUser } from '@/features/auth/types/auth.model';
import { IAuthResponse } from '@/features/auth/types/auth.response';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession['user'] & IUser;
    accessToken: string;
    refreshToken: string;
  }

  interface User extends IAuthResponse, IUser {
    id: number;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   * */
  interface JWT extends DefaultJWT, IUser {
    accessToken: string;
    refreshToken: string;
  }
}
