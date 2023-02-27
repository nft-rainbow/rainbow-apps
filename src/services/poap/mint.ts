import { atom, useRecoilValue } from 'recoil';
import { setRecoil, getRecoil } from 'recoil-nexus';
import { fetchApi } from '@utils/fetch/fetchApi';
import { showToast } from '@components/showToast';
import { getAccount } from '@services/account';
import { refreshPoapConf } from '@services/poap';

export interface Transaction {
  additionalProperties?: object;
  amount: number;
  app_id: number;
  chain_id: number;
  chain_type: number;
  contract: string;
  contract_type: number;
  created_at: string;
  deleted_at: {
    additionalProperties: object;
    time: string;
    valid: true;
  };
  error: string;
  hash: string;
  id: number;
  mint_to: string;
  mint_type: number;
  status: number;
  token_id: string;
  token_uri: string;
  tx_id: number;
  updated_at: string;
}

const transactionConfig = atom<Transaction | null>({
  key: 'transactionConfig',
  default: null,
});

export const handleClaim = async ({ activityId, command }: { activityId: string; command?: string }) => {
  try {
    const account = getAccount()!;
    const res = await fetchApi<{ code: number; message: string } & Transaction>({
      path: 'poap/h5',
      method: 'POST',
      params: {
        activity_id: activityId,
        user_address: account,
        command: command ?? '',
      },
    });
    if (res?.code === 50000) {
      showToast({ content: `领取失败: ${res.message}`, type: 'failed' });
      return;
    }
    if (res?.code === 429) {
      showToast({ content: '超过当日请求次数限制，请明天再来', type: 'failed' });
      return;
    }
    setRecoil(transactionConfig, { ...res });
    await refreshPoapConf(activityId);
    showToast({ content: '正在发放，预计需要1分钟', type: 'success' });
  } catch (err) {
    showToast({ content: `领取失败: ${err}`, type: 'failed' });
    console.log('claim error: ', err);
  }
};

export const useTransaction = () => useRecoilValue(transactionConfig);
export const getTransaction = () => getRecoil(transactionConfig);
