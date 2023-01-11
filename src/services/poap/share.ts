import { fetchApi } from '@utils/fetch/fetchApi';
import { showToast, hideToast } from '@components/showPopup';

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
          //showToast(shareRes.message);
          return;
        }
        searchParams.delete('sharer');
        history.replaceState(null, '', decodeURIComponent(searchParams.toString()));
      })
      .catch((err) => {
        //showToast(shareRes.message);
        console.log('share err', err);
      });
  }
};
