'use server';

import fetcher from '@/common/utils/fetcher';
import { auth } from '../auth/lib/next-auth';
import { IUser } from '../auth/types/auth.model';
import { PaginationResponse } from '@/common/types/response.type';
import { PaginationQueryRequest } from '@/common/types/request.type';

export const getUsers = async (params: PaginationQueryRequest) => {
  const getAuth = await auth();
  const bearerToken = getAuth?.accessToken || null;

  return await fetcher<PaginationResponse<IUser>>({
    path: '/users' + `?page=${params.page}&take=${params.take}`,
    method: 'GET',
    isExternal: true,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};
