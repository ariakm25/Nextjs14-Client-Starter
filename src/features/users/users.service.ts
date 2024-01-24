'use server';

import fetcher from '@/common/utils/fetcher';
import { auth } from '../auth/lib/next-auth';
import { IUser } from '../auth/types/auth.model';
import { IPaginationQueryRequest } from '@/common/types/request.type';
import {
  IBaseResponse,
  IPaginationResponse,
} from '@/common/types/response.type';

export const getUsers = async (params: IPaginationQueryRequest) => {
  const getAuth = await auth();
  const bearerToken = getAuth?.accessToken || null;

  return await fetcher<IBaseResponse<IPaginationResponse<IUser>>>({
    path: '/users' + `?page=${params.page}&take=${params.take}`,
    method: 'GET',
    isExternal: true,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
};
