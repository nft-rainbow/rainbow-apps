import React from "react";

export interface PoapFragProps {
  cover: any,
  address: string,
  name: string,
  description: string,
  date: string,
  endData?: string,
  link: string,
  available: number
}
const PoapFrag: React.FC<PoapFragProps> = ({ cover, address, name, description, date, link, available, endData }) => {
  return (
    <div className="px-[48px] pt-[42px] flex flex-col justify-start">
      <img alt="cover" src={cover} className="w-[654px] h-[654px]pointer-events-none" draggable={false} />
      <p className="mt-[40px] font-medium text-[28px] leading-[36px]">合约地址</p>
      <p className="mt-[12px]">{address}</p>
      <p className="mt-[40px] text-[40px] leading-[48px] font-semibold">{name}</p>
      <p className="mt-[24px] text-[28px]" dangerouslySetInnerHTML={{ '__html': description }}></p>
      <p className="mt-[24px]">开始时间：<span>{date}</span></p>
      {endData && <p className="mt-[24px]">结束时间<span>{endData}</span></p>}
      <div className="mt-[32px] flex flex-col items-center">
        <a href={link} target="_blank" className="text-[28px] leading-[60px] text-[#2800FF] underline">去 Anyweb 查看 &gt;</a>
        {
          available > 0 && (
            <p className="mt-[28px] text-[28px]">可领取{available}次</p>
          )
        }
        {/* <button className="mt-[20px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] font-[32px] text-[#ffffff]">领取</button> */}
        <button className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] font-[32px] text-[#6953EF]">分享</button>
      </div>
    </div>
  )
}

export default PoapFrag