import { fetchApi } from '@utils/fetch/fetchApi';
import { showToast } from '@components/showToast';

export const doShare = (receiver: string) => {
  const url = new URL(location.href);
  const searchParams = new URLSearchParams(url.search);
  const activity_id = searchParams.get('activity_id');
  const sharer = searchParams.get('sharer');
  if (sharer !== null && activity_id !== null && sharer !== receiver) {
    fetchApi<{ code: number; message: string } | 'success'>({
      path: 'poap/sharer',
      method: 'POST',
      params: {
        activity_id: activity_id,
        receiver,
        sharer
      },
    })
      .then((shareRes) => {
        if (typeof shareRes === 'object' && shareRes?.code === 50000) {
          showToast({ content: '今日已为朋友助力，快快分享给其他朋友来帮忙吧！', type: 'failed' });
          history.replaceState(null, '', url.origin + `?activity_id=${activity_id}`);
          return;
        }
        if (typeof shareRes === 'object' && shareRes?.code === 429) {
          showToast({ content: '超过当日请求次数限制，请明天再来', type: 'failed' });
          return;
        }
        showToast({ content: '成功为朋友助力一次领取机会', type: 'success' });
        history.replaceState(null, '', url.origin + `?activity_id=${activity_id}`);
      })
      .catch((err) => {
        if (err.code === 5000) {
          showToast({ content: '今日已为朋友助力，快快分享给其他朋友来帮忙吧！', type: 'failed' });
        } else {
          showToast({ content: `分享失败: ${err}`, type: 'failed' });
          console.log('share err', err);
        }
      });
  }
};
