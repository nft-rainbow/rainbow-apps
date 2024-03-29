import { getAccount } from '@services/account';
import { isProduction } from '@utils/consts';
import { fetchApi } from '@utils/fetch/fetchApi';
import { Transaction } from './mint';

// If no account or return list is empty, return undefined
export const getTokenId = async (activityId: string) => {
  const account = getAccount()!;
  if (!account) return undefined;
  const res = await fetchApi<{ count: number; items: Array<Transaction> }>({
    path: `poap/activity/result/${activityId}?page=1&limit=1&address=${account}&statuses=1`,
    method: 'GET',
  });
  return res?.items[0];
};

export const getHashURL = () => {
  const token_id = localStorage.getItem('token_id');
  if (!token_id) return '';
  const contract_address = localStorage.getItem('contract_address');
  const url = isProduction ? 'https://confluxscan.net/nft/' : 'https://testnet.confluxscan.net/nft/';
  if (token_id && contract_address) {
    return url + contract_address + '/' + token_id;
  } else return '';
};
