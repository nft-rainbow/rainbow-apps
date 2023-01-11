import React from 'react';
import ClipBoard from '@assets/clipboard.svg';
import Mark from '@assets/mark.svg';
import useActivityId from '@hooks/useActivityId';
import { usePoapConfig } from '@services/poap';
import { ShareButton } from '@modules/ShareButton';

const Success: React.FC = () => {
  const activityId = useActivityId()!;
  const poapConf = usePoapConfig(activityId);
  

  return (
    <div className="px-[48px] pt-[42px] flex flex-col justify-start">
      <div className="relative w-[654px] h-[654px]">
        <img
          alt="activity picture"
          src={poapConf?.activity_picture_url}
          className="absolute w-[654px] h-[654px] border-[8px] border-[#ffffff] pointer-events-none"
          draggable={false}
        />
        <img alt="mark" src={Mark} className="absolute right-[8px] bottom-[9px] w-[88px] h-[88px]" />
      </div>
      <div className="mt-[42px] flex flex-row w-fit h-[40px] text-[26px] leading-[34px]">
        <div className="px-[12px] flex flex-row justify-center items-center h-[40px] rounded-tl-[20px] rounded-bl-[4px] bg-[#6953EF] text-[#ffffff] text-center align-middle">
          通行证ID
        </div>
        <div className="px-[12px] flex flex-row justify-center items-center min-w-[102px] h-[40px] border border-[#6953EF] rounded-tr-[4px] rounded-br-[20px] text-center align-middle text-[#6953EF]">
          {poapConf?.amount}
        </div>
      </div>
      <p className="mt-[24px] font-medium text-[28px] leading-[36px] text-[#37334C]">哈希</p>
      <div className="mt-[12px] flex flex-row items-center text-[#696679]">
        <p className="text-[24px] leading-[32px]">{poapConf?.contract_address}</p>
        <img
          src={ClipBoard}
          alt="clipboard logo"
          className="ml-[8px] w-[32px] h-[32px] cursor-pointer"
          onClick={() => navigator.clipboard.writeText(`${poapConf?.contract_address}`)}
        />
      </div>
      <p className="mt-[42px] text-[40px] leading-[48px] font-semibold text-[#05001F]">{poapConf?.name}</p>
      <p className="mt-[24px] text-[28px] text-[#696679] leading-[36px]" dangerouslySetInnerHTML={{ __html: poapConf?.description ?? '' }}></p>
      <div className="flex flex-col items-center">
        <ShareButton type="success" />
      </div>
    </div>
  );
};
export default Success;
