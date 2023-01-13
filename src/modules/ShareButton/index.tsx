import React, { useCallback, type ComponentProps } from 'react';
import cx from 'clsx';
import useClipboard from 'react-use-clipboard';
import useActivityId from '@hooks/useActivityId';
import { useAccount } from '@services/account';
import { showToast } from '@components/showToast';

export const ShareButton: React.FC<{ type: 'home' | 'success' }> = ({ type }) => {
  const account = useAccount()!;
  const activityId = useActivityId()!;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`见者有份，就差你了!福将抓在手，万事不用愁！点击 ${location.origin}/?activity_id=${activityId}&sharer=${account} 链接一起抓福将吧！`);
    showToast({ content: '邀请口令已复制，快去粘贴给好友吧！', type: 'success' })
  }, [])

  return (
    <button
      className={cx({
        'mt-[24px] flex justify-center items-center h-[104px] w-[654px] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff] bg-[#6953EF]': type === 'success',
        'mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]':
          type === 'home',
      })}
      onClick={handleCopy}
    >
      邀请好友帮忙
    </button>
  );
};
