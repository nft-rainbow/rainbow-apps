import React from "react";
import cx from 'clsx'
import { useAccount } from "@services/account"

const ClaimButton: React.FC = () => {
  const account = useAccount()
  return (
    <button className={cx('mt-[20px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] font-[32px] text-[#ffffff]', !!account ?? 'cursor-not-allowed')}>领取</button>
  )
}