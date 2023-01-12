import { selectorFamily, useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { fetchApi } from '@utils/fetch/fetchApi';
import { accountState } from '@services/account';

export interface ActivityConf {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  amount: number;
  name: string;
  description: string;
  app_id: number;
  chain_type: number;
  end_time: number;
  start_time: number;
  rainbow_user_id: number;
  contract_type: number;
  contract_address: string;
  contract_id: number;
  max_mint_count: number;
  activity_picture_url: string;
  sharing_content: string;
  nft_contract_infos: Array<{
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
    metadata_uri: string;
    probability: number;
    token_id: string;
    NewYearConfigID: number;
  }>;
}

const poapConfigQuery = selectorFamily<((ActivityConf & { count: number }) & { mintedCount: number }) | null, string>({
  key: 'poapConfig',
  get:
    (activity_id: string) =>
    async ({ get }) => {
      const account = get(accountState);
      if (!account) return null;
      const [activityConf, mintedCount, activityCount] = await Promise.all([
        fetchApi<ActivityConf>({
          path: `poap/activity/${activity_id}`,
          method: 'GET',
        }),
        fetchApi<{ count: number }>({
          path: `poap/activity/result/${activity_id}`,
          method: 'GET',
        }),
        fetchApi<{ count: number }>({
          path: `poap/count/${account}/${activity_id}`,
          method: 'GET',
        }),
      ]);
      return {
        ...activityConf,
        mintedCount: mintedCount.count,
        count: activityCount.count,
      };
    },
});

export const usePoapConfig = (activity_id: string) => useRecoilValue(poapConfigQuery(activity_id));
export const useRefreshPoapConfig = (activity_id: string) => useRecoilRefresher_UNSTABLE(poapConfigQuery(activity_id));
