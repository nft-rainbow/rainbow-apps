import React from "react";
import Unconnected from '@assets/unconnected.svg'
import Connected from '@assets/connected.svg'
import Logo from "@assets/logo.png";
import AuthConnectButton from "@modules/AuthConnectButton";
import { useAccount, connect } from "@services/account"

const ConnectButton: React.FC = () => {
  return (
    <button onClick={connect} className="flex flex-row items-center px-[24px] py-[16px] text-[#6953EF] border-[2px] border-[#6953EF] rounded-[32px]">
      <img src={Unconnected} alt="unconnected logo" className="w-[16px] h-[16px] mr-[16px] select-none" draggable={false} width={16} height={16} />
      连接Anyweb
    </button>
  )
}

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
    <div className="px-[32px] py-[11px] flex flex-row justify-between h-[88px] z-20">
      <img src={Logo} alt="POA Logo" className="w-[64px] h-[64px]" width={64} height={64} />
      <AuthConnectButton Connected={<Account account={account ?? ''} />} Unconnected={<ConnectButton />} />
    </div>
  )
}

export default Navigation;

