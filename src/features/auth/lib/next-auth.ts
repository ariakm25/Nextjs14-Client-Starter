import { getServerSession, NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginWithEmailAndPassword, me } from '@/features/auth/auth.service';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { JWT } from 'next-auth/jwt';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      type: 'credentials',
      name: 'Login with email and password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'yourname@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (credentials) {
          try {
            const { data: loginData } = await loginWithEmailAndPassword({
              email: credentials.email,
              password: credentials.password,
            });

            const { data: userData } = await me(loginData.accessToken);

            return {
              ...loginData,
              ...userData,
            };
          } catch (error) {
            console.error(error);
            throw error;
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }): Promise<Session> => {
      return {
        user: {
          ...session.user,
          name: session.user?.name ?? token?.name,
          email: session.user?.email ?? token?.email,
          avatar: session.user?.avatar ?? token?.avatar,
          role: session.user?.role ?? token?.role,
          createdAt: session.user?.createdAt ?? token?.createdAt,
          roleId: session.user?.roleId ?? token?.roleId,
          image: session.user?.image ?? token?.avatar,
          id: session.user?.id ?? token?.id,
        },
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expires: session.expires ?? token.exp,
      };
    },

    jwt: async ({ token, user }): Promise<JWT> => {
      return {
        ...token,
        ...user,
        id: (user?.id as number) ?? (token?.id as number),
      };
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
    signOut: '/auth/login',
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, nextAuthOptions);
}
