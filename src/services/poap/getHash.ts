import { getAccount } from '@services/account';
import { isProduction } from '@utils/consts';
import { fetchApi } from '@utils/fetch/fetchApi';

export interface ClaimList {
    activity_id: string,
    id: number,
}

export const getHash = async ({ activityId }: { activityId: string }) => {
    const account = getAccount()!;
    const res = await fetchApi<{ count: number, items: Array<ClaimList> }>({
        path: `poap/activity/result/${activityId}?page=1&limit=1&address=${account}`,
        method: 'GET',
    });
    return res?.items[0];

}

export const getHashURL = () => {
    const hash = localStorage.getItem('hash');
    const url = isProduction ? "https://confluxscan.net/tx/" : "https://testnet.confluxscan.net/tx/";
    return url + hash;
}