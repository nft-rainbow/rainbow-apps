import React, { useCallback } from 'react';
import Connected from '@assets/connected.svg';
import Logo from '@assets/logo.png';
import AuthConnectButton from '@modules/AuthConnectButton';
import disconnectIcon from '@assets/disconnect.svg';
import { shortenCfxAddress } from '@utils/addressUtils/shortenAddress';
import { disconnect } from '@services/account';
import Dropdown from '@components/Dropdown';
import { getAccountMethod } from '@services/account';

const DropdownContent: React.FC = () => {
  return (
    <div onClick={() => {disconnect(getAccountMethod()??'anyweb')}} className="bg-white flex md:h-[42px] md:w-[190px] h-[64px] w-[286px] items-center md:rounded-[4px] rounded-[8px] cursor-pointer">
      <img src={disconnectIcon} alt="disconnect" className="md:w-[16px] md:h-[16px] h-[24px] w-[24px] md:ml-[16px] md:mr-[8px] ml-[24px] mr-[12px]" draggable={false} />
      <div className="md:text-[16px] text-[#37334C]">断开连接</div>
    </div>
  );
};

const Account: React.FC<{ account: string }> = ({ account }) => {
  const shortenAddress = shortenCfxAddress(account);
  return (
    <Dropdown Content={DropdownContent}>
      <div className="flex flex-row items-center px-[24px] h-[64px] md:h-[42px] border-[2px] md:border-[1px] border-[#E6E6E9] rounded-[32px] md:rounded-[21px]">
        <img src={Connected} alt="connected logo" className="w-[16px] md:w-[10px] h-[16px] md:h-[10px] mr-[16px] md:mr-[8px] select-none" draggable={false} />
        <p className="h-[64px] md:h-[42px] flex justify-center items-center text-[24px] md:text-[16px] leading-[32px] md:leading-[22px] text-[#05001F] text-ellipsis overflow-hidden">{shortenAddress}</p>
      </div>
    </Dropdown>
  );
};

const Navigation: React.FC = () => {
  return (
    <div className="px-[32px] flex flex-row justify-between items-center h-[88px] md:h-[100px] z-20">
      <img src={Logo} alt="POA Logo" className="w-[64px] md:w-[51px] h-[61px] md:h-[50px]" />
      <AuthConnectButton type="circle">{(account) => <Account account={account} />}</AuthConnectButton>
    </div>
  );
};

export default Navigation;
