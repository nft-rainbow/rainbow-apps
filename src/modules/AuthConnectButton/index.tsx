import { useCallback, type PropsWithChildren } from "react"
import Unconnected from '@assets/unconnected.svg'
import { useAccount, connect } from "@services/account"

const ConnectButton: React.FC = () => {

  return (
    <button onClick={connect} className="flex flex-row items-center px-[24px] py-[16px] text-[#6953EF] border-[2px] border-[#6953EF] rounded-[32px]">
      <img src={Unconnected} alt="unconnected logo" className="w-[16px] h-[16px] mr-[16px] select-none" draggable={false} width={16} height={16} />
      连接Anyweb
    </button>
  )
}

const AuthConnectButton: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  const account = useAccount()
  if (account) {
    return <div>{children}</div>
  } else {
    return <ConnectButton />
  }
}

export default AuthConnectButton;