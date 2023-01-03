import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Logo from "@assets/logo.png";
import AuthConnectButton from "@modules/AuthConnectButton";

const Navigation: React.FC = () => {
  return (
    <div className="px-[32px] py-[11px] flex flex-row justify-between">
      <LazyLoadImage src={Logo} alt="POA Logo" className="w-[64px] h-[64px]" width={64} height={64} />
      <AuthConnectButton />
    </div>
  )
}

export default Navigation;

