import React from "react";
import cx from 'clsx';
import AuthConnectButton from "@modules/AuthConnectButton";
import { useAccount, connect } from "@services/account";

const ClaimButton: React.FC = () => {
  const account = useAccount()
  return (
    <button className='mt-[24px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] font-[32px] font-medium leading-[40px] text-[#ffffff]'>领取</button>
  )
}

const ConnectClaimButton: React.FC = () => {
  return (
    <button onClick={connect} className='mt-[24px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] font-[32px] font-medium leading-[40px] text-[#ffffff]'>连接钱包</button>
  )
}

const AuthClaimButton: React.FC = () => {
  return (
    <AuthConnectButton Connected={<ClaimButton />} Unconnected={<ConnectClaimButton />} />
  )
}

export default AuthClaimButton;