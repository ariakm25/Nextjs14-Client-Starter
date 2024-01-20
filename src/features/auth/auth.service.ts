'use server';

import type { ILoginSchema } from '@/features/auth/types/auth.request';
import fetcher from '@/common/utils/fetcher';
import { IAuthResponse } from '@/features/auth/types/auth.response';
import { auth } from '@/features/auth/lib/next-auth';
import { IUser } from '@/features/auth/types/auth.model';
import { BaseResponse } from '@/common/types/response.type';

export const loginWithEmailAndPassword = async (payload: ILoginSchema) => {
  return await fetcher<BaseResponse<IAuthResponse>, ILoginSchema>({
    path: '/auth/login',
    method: 'POST',
    data: payload,
    headers: {
      'Content-Type': 'application/json',
    },
    isExternal: true,
  });
};

export const me = async (token?: string) => {
  let bearerToken: string | null;
  if (token) {
    bearerToken = token;
  } else {
    const getAuth = await auth();
    bearerToken = getAuth?.accessToken || null;
  }

  return await fetcher<IUser>({
    path: '/auth/me',
    method: 'GET',
    isExternal: true,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};
