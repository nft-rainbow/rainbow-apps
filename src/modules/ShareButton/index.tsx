import React, { useCallback } from 'react';
import cx from 'clsx';
import useActivityId from '@hooks/useActivityId';
import { useAccount } from '@services/account';
import { showToast } from '@components/showToast';
import { usePoapConfig } from '@services/poap';

export const ShareButton: React.FC<{ type: 'home' | 'success' }> = ({ type }) => {
  const account = useAccount()!;
  const activityId = useActivityId()!;
  const { value: poapConf, loading } = usePoapConfig(activityId);

  const isWeChat = useCallback(() => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    const ua = window.navigator.userAgent.toLowerCase();
    const res = ua.match(/MicroMessenger/i);
    if (res?.find((item) => item === 'micromessenger') && isAndroid) return true;
    return false
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(`${poapConf?.sharing_content} ${location.origin}/?activity_id=${activityId}&sharer=${account}`);
    showToast({ content: '邀请口令已复制，快去粘贴给好友吧！', type: 'success' });
  }

  return (
    <>
      {(loading || poapConf?.sharing_content) && (isWeChat() ? (
        <div className='mt-[24px] flex flex-col justify-center items-center text-[32px]'>
          <p className='mb-[24px] text-[#6953EF]'>复制下列链接给好友</p>
          <p className='text-[28px] text-[#696679] leading-[36px] text-center break-all'>{poapConf?.sharing_content} {location.origin}/?activity_id=${activityId}&sharer=${account}</p>
        </div>
      ) :
        <button
          className={cx({
            'mt-[24px] flex justify-center items-center h-[104px] w-[654px] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff] bg-[#6953EF]': type === 'success',
            'mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]':
              type === 'home',
            'opacity-30 pointer-events-none': loading
          })}
          onClick={handleCopy}
        >
          邀请好友帮忙
        </button>
      )}
    </>
  );
};
