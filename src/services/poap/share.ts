import { fetchApi } from '@utils/fetch/fetchApi';
import { showToast } from '@components/showToast';

export const doShare = (reciever: string) => {
  const url = new URL(location.href);
  const searchParams = new URLSearchParams(url.search);
  const activity_id = searchParams.get('activity_id');
  const sharer = searchParams.get('sharer');
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
          if (shareRes.message === 'The sharer has shared the link to receiver') {
            showToast({ content: `今日已分享过该地址`, type: 'failed' });
            history.replaceState(null, '', url.origin + `?activity_id=${activity_id}`);
          } else {
            showToast({ content: `分享失败: ${shareRes.message}`, type: 'failed' });
          }
          return;
        }
        showToast({ content: '分享成功', type: 'success' });
        history.replaceState(null, '', url.origin + `?activity_id=${activity_id}`);
      })
      .catch((err) => {
        showToast({ content: `分享失败: ${err}`, type: 'failed' });
        console.log('share err', err);
      });
  }
};
