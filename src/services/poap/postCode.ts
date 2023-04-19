import { fetchApi } from '@utils/fetch/fetchApi';

interface PostCode {
  address: string;
  code?: string;
  phone?: string;
  wallet: 'anyweb'|'cellar';
}

export const postCode = (params: PostCode) => {
  const url = new URL(location.href);
  fetchApi<{ code: number; message: string } | 'success'>({
    path: 'poap/wallet/user',
    method: 'POST',
    params: params,
  });
};