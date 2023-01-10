import React from 'react'
import { Link } from "react-router-dom";
import ClipBoard from "@assets/clipboard.svg";
import { usePoapConfig } from '@hooks/usePoapConfig';
import AuthConnectButton from '@modules/AuthConnectButton'
import { ShareButton } from '@modules/ShareButton'

const ClaimButton: React.FC = () => {
  return (
    <Link to="success"
      className='mt-[60px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff]'>领取</Link>
  )
}

const Home: React.FC = () => {
  const poapState = usePoapConfig();
  const { cover, claimed, address, limitation, name, description, date, endData, link, available } = poapState
  return (
    <div className="px-[48px] pt-[42px] flex flex-col justify-start">
      <div className="relative w-[654px] h-[654px]">
        <img alt="cover" src={cover} className="absolute w-[654px] h-[654px] border-[8px] border-[#ffffff] pointer-events-none" draggable={false} />
        <div className="m-[24px] px-[16px] flex flex-row justify-center items-center w-fit h-[48px] rounded-tl-[24px] rounded-tr-[4px] rounded-br-[24px] rounded-bl-[4px] text-[24px] leading-[32px] text-[#FFFFFF] bg-[#05001F] opacity-70">{limitation ? limitation : '不限量'}</div>
      </div>
      <div className="mt-[42px] flex flex-row w-fit h-[40px] text-[26px] leading-[34px]">
        <div className="px-[12px] flex flex-row justify-center items-center h-[40px] rounded-tl-[20px] rounded-bl-[4px] bg-[#6953EF] text-[#ffffff]">已领取</div><div className="px-[12px] flex flex-row justify-center items-center min-w-[102px] h-[40px] border border-[#6953EF] rounded-tr-[4px] rounded-br-[20px] text-center align-middle text-[#6953EF]">{claimed}</div>
      </div>
      <p className="mt-[24px] text-[28px] leading-[36px] font-medium text-[#37334C]">合约地址</p>
      <div className="mt-[12px] flex flex-row items-center text-[#696679]">
        <p className='text-[24px] leading-[32px]'>{address}</p>
        <img src={ClipBoard} alt='clipboard logo' className="ml-[8px] w-[32px] h-[32px] cursor-pointer" onClick={() => navigator.clipboard.writeText(`${address}`)} />
      </div>
      <p className="mt-[42px] text-[40px] leading-[48px] font-semibold text-[#05001F]">{name}</p>
      <p className="mt-[24px] text-[28px] text-[#696679] leading-[36px]" dangerouslySetInnerHTML={{ '__html': description }}></p>
      <p className="mt-[24px] text-[24px] leading-[32px] text-[#696679]">开始时间:  <span>{date}</span></p>
      {endData && <p className="text-[24px] leading-[32px] text-[#696679]">结束时间:  <span>{endData}</span></p>}
      {
        available > 0 && (
          <p className="mt-[32px] text-[28px] leading-[32px] text-[#37334C] align-middle">可领取  <span className="text-[#6953EF] font-medium">{available}</span>  次</p>
        )
      }
      <div className="flex flex-col items-center">
        <AuthConnectButton type="rectangle">
          <ClaimButton />
        </AuthConnectButton>
        {/* <button className="mt-[24px] flex justify-center items-center h-[104px] w-[654px] border border-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#6953EF]">分享</button> */}
        <ShareButton type='home' />
        <a href={link} target="_blank" className="mt-[42px] text-[28px] leading-[36px] text-[#6953EF] border-b-2 border-[#6953EF]">去 Anyweb 查看&gt;</a>
      </div>
    </div>
  )
}
export default Home
