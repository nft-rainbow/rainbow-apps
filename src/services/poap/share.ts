import { fetchApi } from '@utils/fetch/fetchApi';
import { showToast } from '@components/showPopup';

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
          showToast('分享失败', { type: 'share' });
          return;
        }
        showToast('分享成功', { type: 'success' });
        searchParams.delete('sharer');
        history.replaceState(null, '', decodeURIComponent(searchParams.toString()));
      })
      .catch((err) => {
        showToast('分享失败', { type: 'share' });
        console.log('share err', err);
      });
  }
};
