import React from 'react'
import ClipBoard from "@assets/clipboard.svg";
import Mark from "@assets/mark.svg";
import { usePoapConfig } from '@hooks/usePoapConfig';
import { ShareButton } from '@modules/ShareButton'

const Success: React.FC = () => {
  const poapState = usePoapConfig();
  const { cover, claimed, address, name, description } = poapState;
  return (
    <div className="px-[48px] pt-[42px] flex flex-col justify-start">
      <div className="relative w-[654px] h-[654px]">
        <img alt="cover" src={cover} className="absolute w-[654px] h-[654px] border-[8px] border-[#ffffff] pointer-events-none" draggable={false} />
        <img alt='mark' src={Mark} className="absolute right-[8px] bottom-[9px] w-[88px] h-[88px]" />
      </div>
      <div className="mt-[42px] flex flex-row w-fit h-[40px] text-[26px] leading-[34px]">
        <div className="px-[12px] flex flex-row justify-center items-center h-[40px] rounded-tl-[20px] rounded-bl-[4px] bg-[#6953EF] text-[#ffffff] text-center align-middle">通行证ID</div><div className="px-[12px] flex flex-row justify-center items-center min-w-[102px] h-[40px] border border-[#6953EF] rounded-tr-[4px] rounded-br-[20px] text-center align-middle text-[#6953EF]">{claimed}</div>
      </div>
      <p className="mt-[24px] font-medium text-[28px] leading-[36px] text-[#37334C]">哈希</p>
      <div className="mt-[12px] flex flex-row items-center text-[#696679]">
        <p className='text-[24px] leading-[32px]'>{address}</p>
        <img src={ClipBoard} alt='clipboard logo' className="ml-[8px] w-[32px] h-[32px] cursor-pointer" onClick={() => navigator.clipboard.writeText(`${address}`)} />
      </div>
      <p className="mt-[42px] text-[40px] leading-[48px] font-semibold text-[#05001F]">{name}</p>
      <p className="mt-[24px] text-[28px] text-[#696679] leading-[36px]" dangerouslySetInnerHTML={{ '__html': description }}></p>
      <div className="flex flex-col items-center">
        <ShareButton type='success' />
        {/* <button className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff] bg-[#6953EF]">分享</button> */}
      </div>
    </div>
  )
}
export default Success
