import React, { type ComponentProps } from 'react';
import cx from 'clsx';
import useClipboard from 'react-use-clipboard';
import useActivityId from '@hooks/useActivityId';
import { useAccount } from '@services/account';
import Tooltip from '@modules/Tooltip';

export const ShareButton: React.FC<{ type: 'home' | 'success' }> = ({ type }) => {
  const account = useAccount()!;
  const activityId = useActivityId()!;
  const [isCopied, copy] = useClipboard(`${location.origin}?activity_id=${activityId}&sharer=${account}`, { successDuration: 1000 });

  return (
    <Tooltip content="复制分享链接成功" visible={isCopied}>
      <button
        className={cx({
          'mt-[24px] flex justify-center items-center h-[104px] w-[654px] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff] bg-[#6953EF]': type === 'success',
          'mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]':
            type === 'home',
        })}
        onClick={copy}
      >
        分享
      </button>
    </Tooltip>
  );
};
