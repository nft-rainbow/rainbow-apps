import { fetchApi } from '@utils/fetch/fetchApi';
import { showToast } from '@components/showToast';

export const doShare = (reciever: string) => {
  const searchParams = new URLSearchParams(location.href);
  const sharer = searchParams.get('sharer');
  const activity_id = searchParams.get('activity_id');
  if (sharer !== null && activity_id !== null && sharer !== reciever) {
    fetchApi<{ code: number; message: string } | 'success'>({
      path: 'poap/sharer',
      method: 'POST',
      params: {
        activity_id: parseInt(activity_id),
        reciever,
        sharer,
      },
    })
      .then((shareRes) => {
        if (typeof shareRes === 'object' && shareRes?.code === 50000) {
          showToast({ content: `领取失败: ${shareRes.message}`, type: 'failed' });
          return;
        }
        showToast({ content: '领取成功', type: 'success' });
        searchParams.delete('sharer');
        history.replaceState(null, '', decodeURIComponent(searchParams.toString()));
      })
      .catch((err) => {
        showToast({ content: `领取失败: ${err}`, type: 'failed' });
        console.log('share err', err);
      });
  }
};
