import {
  ErrorResponseException,
  IErrorResponse,
} from '@/common/types/response.type';

export interface IFetcherRequest<Req> {
  path: string;
  data?: Req;
  query?: { [key: string]: string | number };
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: RequestInit['headers'];
  options?: RequestInit;
  isExternal?: boolean;
}

const fetcher = async <Res, Req = never>({
  path,
  data,
  query,
  method = 'GET',
  headers = {},
  options,
  isExternal = false,
}: IFetcherRequest<Req>): Promise<Res> => {
  let response: Response;
  let responseJSON: Res | IErrorResponse;

  try {
    const apiURL = isExternal
      ? process.env.API_URL
      : `${process.env.NEXT_PUBLIC_URL}/api`;

    const url = new URL(`${apiURL}${path}`);

    if (query) {
      Object.keys(query).forEach((key) =>
        url.searchParams.append(key, query[key].toString())
      );
    }

    const dataBody = data
      ? data instanceof FormData
        ? data
        : JSON.stringify(data)
      : undefined;

    response = await fetch(url.href, {
      method: method,
      body: dataBody,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...options,
    });

    responseJSON = await response.json();
  } catch (error) {
    console.error('Fetch error', error);
    throw new Error('Network Error');
  }

  if (!response.ok) {
    responseJSON = responseJSON as IErrorResponse;
    throw new ErrorResponseException(
      responseJSON.statusCode,
      Array.isArray(responseJSON.message)
        ? responseJSON.message
        : [responseJSON.message],
      responseJSON.error,
      {
        path,
        data: data as never,
        query,
        method,
        headers,
        options,
        isExternal,
      }
    );
  }

  return responseJSON as Res;
};

export default fetcher;
