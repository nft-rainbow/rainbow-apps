import React, { useCallback } from 'react';
import Connected from '@assets/connected.svg';
import Logo from '@assets/logo.png';
import AuthConnectButton from '@modules/AuthConnectButton';
import { shortenCfxAddress } from '@utils/addressUtils/shortenAddress';

const Account: React.FC<{ account: string }> = ({ account }) => {
  const shortenAddress = shortenCfxAddress(account);
  return (
    <div className="flex flex-row items-center px-[24px] h-[64px] md:h-[42px] border-[2px] md:border-[1px] border-[#E6E6E9] rounded-[32px] md:rounded-[21px]">
      <img src={Connected} alt="connected logo" className="w-[16px] md:w-[10px] h-[16px] md:h-[10px] mr-[16px] md:mr-[8px] select-none" draggable={false}/>
      <p className="h-[64px] md:h-[42px] flex justify-center items-center text-[24px] md:text-[16px] leading-[32px] md:leading-[22px] text-[#05001F] text-ellipsis overflow-hidden">{shortenAddress}</p>
    </div>
  );
};

const Navigation: React.FC = () => {
  return (
    <div className="px-[32px] flex flex-row justify-between items-center h-[88px] md:h-[100px] z-20">
      <img src={Logo} alt="POA Logo" className="w-[64px] md:w-[51px] h-[61px] md:h-[50px]"/>
      <AuthConnectButton type="circle">{(account) => <Account account={account} />}</AuthConnectButton>
    </div>
  );
};

export default Navigation;
