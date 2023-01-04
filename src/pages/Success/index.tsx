import React from 'react'
import { useLocation } from "react-router-dom";
import ClipBoard from "@assets/clipboard.svg";

const Success: React.FC = () => {
  const location = useLocation();
  const { cover, claimed, address, name, description } = location.state;
  return (
    <div className="px-[48px] pt-[42px] flex flex-col justify-start">
      <div className="relative w-[654px] h-[654px]">
        <img alt="cover" src={cover} className="absolute w-[654px] h-[654px] border-[8px] border-[#ffffff] pointer-events-none" draggable={false} />
      </div>
      <div className="mt-[42px] flex flex-row w-fit text-[26px] leading-[34px]">
        <div className="py-[3px] px-[12px] rounded-tl-[20px] rounded-bl-[4px] bg-[#6953EF] text-[#ffffff]">通行证ID</div><div className="py-[3px] px-[12px] min-w-[102px] border border-[#6953EF] rounded-tr-[4px] rounded-br-[20px] text-center text-[#6953EF]">{claimed}</div>
      </div>
      <p className="mt-[24px] font-medium text-[28px] leading-[36px]">哈希</p>
      <div className="mt-[12px] flex flex-row items-center text-[#696679]">
        <p>{address}</p>
        <img src={ClipBoard} alt='clipboard logo' className="ml-[8px] w-[32px] h-[32px] cursor-pointer" onClick={() => navigator.clipboard.writeText(`${address}`)} />
      </div>
      <p className="mt-[40px] text-[40px] leading-[48px] font-semibold">{name}</p>
      <p className="mt-[24px] text-[28px]" dangerouslySetInnerHTML={{ '__html': description }}></p>
      <div className="flex flex-col items-center">
        <button className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]">分享</button>
      </div>
    </div>
  )
}
export default Success
