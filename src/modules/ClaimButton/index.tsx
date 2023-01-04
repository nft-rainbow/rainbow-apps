import React from "react";
import { Link } from "react-router-dom";
import AuthConnectButton from "@modules/AuthConnectButton";
import { useAccount, connect } from "@services/account";
import { PoapFragProps } from "@modules/PoapFrag";

const ClaimButton: React.FC<PoapFragProps> = (props) => {
  const account = useAccount()
  return (
    <Link to="success"
      state={{ ...props }}
      className='mt-[24px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] text-[32px] font-medium leading-[40px] text-[#ffffff]'>领取</Link>
  )
}

const ConnectClaimButton: React.FC = () => {
  return (
    <button onClick={connect} className='mt-[24px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] text-[32px] font-medium leading-[40px] text-[#ffffff]'>连接钱包</button>
  )
}

const AuthClaimButton: React.FC<PoapFragProps> = (props) => {
  return (
    <AuthConnectButton Connected={<ClaimButton {...props} />} Unconnected={<ConnectClaimButton />} />
  )
}

export default AuthClaimButton;