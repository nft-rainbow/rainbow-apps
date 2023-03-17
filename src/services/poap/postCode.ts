import { fetchApi } from '@utils/fetch/fetchApi';

export const postCode = (address: string, code: string) => {
  const url = new URL(location.href);
  fetchApi<{ code: number; message: string } | 'success'>({
    path: 'poap/anyweb/code',
    method: 'POST',
    params: {
        address,
        code,
    },
  });
};