import { IFetcherRequest } from '@/common/utils/fetcher';

export interface IBaseResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface IPaginationResponse<T> {
  items: T[];
  meta: {
    page: number;
    take: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface IErrorResponse {
  statusCode: number;
  message: Array<string>;
  error?: never;
}

export class ErrorResponseException implements IErrorResponse {
  error?: never;
  message: Array<string>;
  statusCode: number;
  originalRequest?: IFetcherRequest<never>;

  constructor(
    statusCode: number,
    message: Array<string>,
    error?: never,
    originalRequest?: IFetcherRequest<never>
  ) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
    this.originalRequest = originalRequest;
  }
}
