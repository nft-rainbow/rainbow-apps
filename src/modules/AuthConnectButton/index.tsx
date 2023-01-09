import Unconnected from '@assets/unconnected.svg'
import { useAccount, connect } from "@services/account"

const CircleConnectButton: React.FC = () => {
  return (
    <button onClick={connect} className="flex flex-row items-center px-[24px] py-[16px] text-[#6953EF] border-[2px] border-[#6953EF] rounded-[32px]">
      <img src={Unconnected} alt="unconnected logo" className="w-[16px] h-[16px] mr-[16px] select-none" draggable={false} width={16} height={16} />
      连接Anyweb
    </button>
  )
}

const RectangleConnectButton: React.FC = () => {
  return (
    <button onClick={connect} className='mt-[60px] flex justify-center items-center h-[104px] w-[654px] bg-[#6953EF] rounded-[8px] text-[32px] font-medium leading-[40px] text-[#ffffff]'>连接钱包</button>
  )
}

const ConnectButton = {
  "circle": CircleConnectButton,
  "rectangle": RectangleConnectButton,
}
interface AuthConnectButtonProps {
  type: 'circle' | 'rectangle';
  children: JSX.Element | ((account: string) => JSX.Element);
}

const AuthConnectButton: React.FC<AuthConnectButtonProps> = ({ type, children }) => {
  const account = useAccount()
  if (account) {
    if (typeof children === 'function') return children(account);
    return <>{children}</>
  } else {
    return <>{ConnectButton[type]}</>
  }
}

export default AuthConnectButton;