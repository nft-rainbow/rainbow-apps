import React, { useCallback } from "react";
import Unconnected from '@assets/unconnected.svg';
import { useAccount, connect } from '@services/account';
import anywebIcon from '@assets/anyweb.svg';
import shailaIcon from '@assets/shaila.svg';
import { showModal } from '@components/showModal';

interface WalletOptions {
    anyweb: boolean;
    cellar: boolean;
}

const SelectButton: React.FC<{ walletType: string, walletIcon: string, callback: () => void }> = ({ walletType, walletIcon, callback }) => {
  return (
    <button
      className="w-[558px] md:w-[384px] h-[100px] md:h-[52px] text-[32px] md:text-[16px] font-normal mb-[24px] md:mb-[8px] px-3 border border-[#E6E6E9] md:rounded-[6px] flex justify-between items-center text-[#37334C]"
      onClick={callback}
    >
      <span>{walletType}</span>
      <img src={walletIcon} alt="anywebIcon" />
    </button>
  )
}

const ModalContent: React.FC<{wallets: WalletOptions}> = ({wallets}) => {
  return (
    <div className="flex flex-col justify-center items-center self-center">
      <div className="md:mt-[10px] md:mb-[24px] mt-[16px] mb-[18px] text=[#05001F]" >连接钱包</div>
      {wallets.anyweb && <SelectButton walletType="AnyWeb" walletIcon={anywebIcon} callback={() => connect('anyweb')} />}
      {wallets.cellar && <SelectButton walletType="Cellar晒啦" walletIcon={shailaIcon} callback={() => connect('cellar')} />}
    </div>
  )
}

const CircleConnectButton: React.FC<{wallets: WalletOptions}> = ({wallets}) => {
  const handleConnect = useCallback(() => {
    showModal({ content: <ModalContent wallets={wallets} />, className: 'w-[654px] md:w-[480px] h-[432px] md:h-[258px] text-[32px] md:text-[20px] font-medium max-w-[654px]' })
  }, [])
  return (
    <button
      onClick={handleConnect}
      className="flex flex-row items-center px-[24px] md:px-[16px] h-[64px] md:h-[42px]  text-[#6953EF] text-[24px] md:text-[16px] leading-[32px] md:leading-[22px] border-[2px] border-[1px] border-[#6953EF] rounded-[32px] rounded-[21px]"
    >
      <img src={Unconnected} alt="unconnected logo" className="w-[16px] md:w-[10px] h-[16px] md:h-[10px] mr-[16px] md:mr-[8px] select-none" draggable={false} />
      连接钱包
    </button>
  );
};

const RectangleConnectButton: React.FC<{wallets: WalletOptions}> = ({wallets}) => {
  const handleConnect = useCallback(() => {
    showModal({ content: <ModalContent wallets={wallets} />, className: 'w-[654px] md:w-[480px] h-[432px] md:h-[258px] text-[32px] md:text-[20px] font-medium max-w-[654px]' })
  }, [])
  return (
    <button
      onClick={handleConnect}
      className="mt-[60px] md:mt-[24px] flex justify-center items-center h-[104px] md:h-[54px] w-[654px] md:w-[300px] bg-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#ffffff]"
    >
      连接钱包
    </button>
  );
};

const ConnectButton = {
  circle: CircleConnectButton,
  rectangle: RectangleConnectButton,
};

interface AuthConnectButtonProps {
  type: 'circle' | 'rectangle';
  children: JSX.Element | ((account: string) => JSX.Element);
  wallets?: string[]; // control which wallets to show
}

const AuthConnectButton: React.FC<AuthConnectButtonProps> = ({ type, children, wallets = ['anyweb', 'cellar'] }) => {
  const account = useAccount();
  const ConnectBtn = ConnectButton[type];
  if (account) {
    if (typeof children === 'function') return <>{children(account)}</>;
    return <>{children}</>;
  } else {
    const supportWallets: WalletOptions = {
        anyweb: false,
        cellar: false,
    };
    wallets.forEach((wallet) => {
        // @ts-ignore
        supportWallets[wallet] = true;
    });
    return <ConnectBtn wallets={supportWallets} />;
  }
};

export default AuthConnectButton;
