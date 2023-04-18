import { fetchApi } from '@utils/fetch/fetchApi';

interface PostCode {
  address: string;
  code?: string;
  phone?: string;
}

export const postCode = (params: PostCode) => {
  const url = new URL(location.href);
  fetchApi<{ code: number; message: string } | 'success'>({
    path: 'poap/anyweb/code',
    method: 'POST',
    params: params,
  });
};