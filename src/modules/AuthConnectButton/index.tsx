import Unconnected from '@assets/unconnected.svg';
import { useAccount, connect } from '@services/account';
import Dropdown from '@components/Dropdown';

const DropdownContent: React.FC = () => {
  return (
    <div className="flex justify-evenly w-[200px] bg-red-200">
      <div className="cursor-pointer" onClick={() => connect('anyweb')}>
        Anyweb
      </div>
      <div className="cursor-pointer" onClick={() => connect('cellar')}>
        Cellar
      </div>
    </div>
  );
};

const CircleConnectButton: React.FC = () => {
  return (
    <Dropdown Content={DropdownContent}>
      <button className="flex flex-row items-center px-[24px] md:px-[16px] h-[64px] md:h-[42px]  text-[#6953EF] text-[24px] md:text-[16px] leading-[32px] md:leading-[22px] border-[2px] border-[1px] border-[#6953EF] rounded-[32px] rounded-[21px]">
        <img src={Unconnected} alt="unconnected logo" className="w-[16px] md:w-[10px] h-[16px] md:h-[10px] mr-[16px] md:mr-[8px] select-none" draggable={false} />
        连接钱包
      </button>
    </Dropdown>
  );
};

const RectangleConnectButton: React.FC = () => {
  return (
    <Dropdown Content={DropdownContent}>
      <button className="mt-[60px] md:mt-[24px] flex justify-center items-center h-[104px] md:h-[54p] w-[654px] md:w-[300px] bg-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#ffffff]">
        连接钱包
      </button>
    </Dropdown>
  );
};

const ConnectButton = {
  circle: CircleConnectButton,
  rectangle: RectangleConnectButton,
};
interface AuthConnectButtonProps {
  type: 'circle' | 'rectangle';
  children: JSX.Element | ((account: string) => JSX.Element);
}

const AuthConnectButton: React.FC<AuthConnectButtonProps> = ({ type, children }) => {
  const account = useAccount();
  const ConnectBtn = ConnectButton[type];
  if (account) {
    if (typeof children === 'function') return <>{children(account)}</>;
    return <>{children}</>;
  } else {
    return <ConnectBtn />;
  }
};

export default AuthConnectButton;
