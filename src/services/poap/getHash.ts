import { isProduction } from '@utils/consts';
import { fetchApi } from '@utils/fetch/fetchApi';

export const getHash = async ({ activityId, id }: { activityId: string, id: string | null }) => {
    const res = await fetchApi<{ activity_id: string, id: string | null }>({
        path: `poap/activity/result/${activityId}/${id}`,
        method: 'GET',
    })
    return res;
}

export const getHashURL = () => {
    const hash = localStorage.getItem('hash');
    const url = isProduction ?  "https://confluxscan.io/":"https://testnet.confluxscan.io/tx/";
    return url + hash;
}