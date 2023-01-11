import { fetchApi } from '@utils/fetch/fetchApi';
import { showToast } from '@components/showToast';
import { getAccount } from '@services/account';
import { type useNavigate } from 'react-router-dom';

export const handleClaim = async ({
  activityId,
  refreshPoapConfig,
  navigate,
}: {
  activityId: string;
  refreshPoapConfig: VoidFunction;
  navigate: ReturnType<typeof useNavigate>;
}) => {
  try {
    const account = getAccount()!;
    const res = await fetchApi<{ code: number; message: string }>({
      path: 'poap/h5',
      method: 'POST',
      params: {
        activity_id: parseInt(activityId),
        user_address: account,
      },
    });
    if (res?.code === 50000) {
      showToast({ content: `领取失败: ${res.message}`, type: 'failed' });
      return;
    }
    showToast({ content: '领取成功', type: 'success' });
    refreshPoapConfig();
    navigate(`/success?activity_id=${activityId}`);
  } catch (err) {
    showToast({ content: `领取失败: ${err}`, type: 'failed' });
    console.log('claim error: ', err);
  }
};
