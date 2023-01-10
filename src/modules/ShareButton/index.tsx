import React, { type ComponentProps } from 'react';
import useActivityId from '@hooks/useActivityId';
import { useAccount } from '@services/account';

const HomeShareButton: React.FC<ComponentProps<'button'>> = (props) => {
  return (
    <button
      className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]"
      {...props}
    >
      分享
    </button>
  );
};
const SuccessShareButton: React.FC<ComponentProps<'button'>> = (props) => {
  return (
    <button className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff] bg-[#6953EF]" {...props}>
      分享
    </button>
  );
};

const ShareButtonDic = {
  home: HomeShareButton,
  success: SuccessShareButton,
};

export const ShareButton: React.FC<{ type: 'home' | 'success' }> = ({ type }) => {
  const account = useAccount()!;
  const activityId = useActivityId()!;

  const ShareBtn = ShareButtonDic[type];
  return <ShareBtn onClick={() => navigator.clipboard.writeText(`${location.origin}?activity_id=${activityId}&sharer=${account}`)} />;
};
