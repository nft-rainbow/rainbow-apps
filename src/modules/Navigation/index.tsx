import React from "react";
import Connected from '@assets/connected.svg'
import Logo from "@assets/logo.png";
import AuthConnectButton from "@modules/AuthConnectButton";
import { useAccount } from "@services/account"

const Account: React.FC<{ account: string }> = ({ account }) => {
  return (
    <div className="flex flex-row items-center px-[24px] py-[16px] text-[#6953EF] border-[2px] border-[#E6E6E9] rounded-[32px]">
      <img src={Connected} alt="connected logo" className="w-[16px] h-[16px] mr-[16px] select-none" draggable={false} width={16} height={16} />
      <p className="w-[118px] text-[32px] leading-[24px] text-[#05001F] text-ellipsis overflow-hidden">{account}</p>
    </div>
  )
}

const Navigation: React.FC = () => {
  const account = useAccount()
  return (
    <div className="px-[32px] flex flex-row justify-between items-center h-[88px] z-20">
      <img src={Logo} alt="POA Logo" className="w-[64px] h-[64px]" width={64} height={64} />
      <AuthConnectButton children={<Account account={account ?? ''} />} type="circle" />
    </div>
  )
}

export default Navigation;

