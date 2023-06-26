import { useEffect } from 'react';
import { atomFamily, useRecoilValueLoadable } from 'recoil';
import { setRecoil } from 'recoil-nexus';
import { fetchApi } from '@utils/fetch/fetchApi';
import { useAccount, getAccount } from '@services/account';
import useActivityId from '@hooks/useActivityId';

export interface Contract {
    chain_id: number;
    chain_type: number;
    contract_address: string;
    contract_raw_id: number;
    contract_type: number;
    create_at: string;
    delete_at: string;
    update_at: string;
    id: number;
}

export interface NftMetadataInfo {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
    metadata_uri: string;
    probability: number;
    token_id: string;
    NewYearConfigID: number;
}

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
    contract: Contract;
    command: string;
    contract_id: number;
    max_mint_count: number;
    activity_picture_url: string;
    sharing_content: string;
    nft_contract_infos: NftMetadataInfo[];
    support_wallets: string[];
}

export const fetchPoapConf = async (activity_id: string) => {
  const promises = [
    fetchApi<ActivityConf>({
      path: `poap/activity/${activity_id}`,
      method: 'GET',
    }),
    fetchApi<{ count: number }>({
      path: `poap/activity/result/${activity_id}`,
      method: 'GET',
    }),
  ] as unknown as readonly [
    Promise<ActivityConf>,
    Promise<{
      count: number;
    }>,
    undefined | Promise<number>
  ];

  const account = getAccount();
  if (account) {
    (promises as any).push(
      fetchApi<{ count: number }>({
        path: `poap/count/${account}/${activity_id}`,
        method: 'GET',
      })
    );
  }

  const [activityConf, mintedCount, activityCount] = await Promise.all(promises);
  if ((activityConf as any)?.code === 429 || (mintedCount as any)?.code === 429 || (activityCount as any)?.code === 429) throw new Error('超过当日请求次数限制，请明天再来');

  if ((activityConf as any)?.code === 50000) throw new Error(`No activity - ${activity_id}`);

  return {
    ...activityConf,
    mintedCount: mintedCount.count,
    count: (activityCount && !(activityCount as any).code) ? activityCount : undefined,
  } as PoapConf;
};

type PoapConf = ((ActivityConf & { count?: number }) & { mintedCount: number }) | null;
const poapConfigState = atomFamily<PoapConf, string>({
  key: 'poapConfigState',
  default: (activity_id) => fetchPoapConf(activity_id),
});

export const usePoapConfig = (activity_id: string) => {
  const { state, contents } = useRecoilValueLoadable(poapConfigState(activity_id));
  return { value: state === 'hasValue' ? contents! : undefined, loading: state === 'loading', error: state === 'hasError' ? contents : undefined } as const;
};

export const refreshPoapConf = (activity_id: string) => fetchPoapConf(activity_id).then((res) => setRecoil(poapConfigState(activity_id), res));

export const usePoapConfWatchAccount = () => {
  const account = useAccount();
  const activityId = useActivityId()!;
  const { loading } = usePoapConfig(activityId);

  useEffect(() => {
    if (!activityId || loading) return;

    if (!account) {
      setRecoil(poapConfigState(activityId), (pre) => ({ ...pre, count: undefined } as PoapConf));
    } else {
      fetchApi<number>({
        path: `poap/count/${account}/${activityId}`,
        method: 'GET',
      }).then((countRes) => {
        setRecoil(poapConfigState(activityId), (pre) => ({ ...pre, count: countRes } as PoapConf));
      });
    }
  }, [account]);
};
