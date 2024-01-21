import { FetcherRequest } from '@/common/utils/fetcher';

export interface BaseResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export interface PaginationResponse<T> {
  data: T[];
  message?: string;
  statusCode?: number;
  page: string;
  take: string;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ErrorResponse {
  statusCode: number;
  message: Array<string>;
  error?: never;
}

export class ErrorResponseException implements ErrorResponse {
  error?: never;
  message: Array<string>;
  statusCode: number;
  originalRequest?: FetcherRequest<never>;

  constructor(
    statusCode: number,
    message: Array<string>,
    error?: never,
    originalRequest?: FetcherRequest<never>
  ) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
    this.originalRequest = originalRequest;
  }
}
