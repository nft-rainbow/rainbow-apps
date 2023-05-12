import { getAccount } from '@services/account';
import { isProduction } from '@utils/consts';
import { fetchApi } from '@utils/fetch/fetchApi';
import { Transaction } from './mint';

export const getTokenId = async (activityId: string) => {
  const account = getAccount()!;
  const res = await fetchApi<{ count: number; items: Array<Transaction> }>({
    path: `poap/activity/result/${activityId}?page=1&limit=1&address=${account}`,
    method: 'GET',
  });
  return res?.items[0];
};

export const getHashURL = () => {
  const token_id = localStorage.getItem('token_id');
  if (!token_id) return '';
  const contract_address = localStorage.getItem('contract_address');
  const url = isProduction ? 'https://confluxscan.net/nft/' : 'https://testnet.confluxscan.net/nft/';
  return url + contract_address + '/' + token_id;
};