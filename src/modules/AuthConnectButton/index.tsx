import Unconnected from '@assets/unconnected.svg';
import { useAccount, connect } from '@services/account';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Modal from 'react-modal';
import './index.css'

Modal.setAppElement('#root');

const ConnectModal = forwardRef((prop,ref) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, ()=> ({openModal}));

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="absolute inset-2/4 -translate-x-1/2 -translate-y-1/2 w-[654px] md:w-[480px] h-[432px] md:h-[258px] md:rounded-[3px] bg-[#ffffff] shadow-modal"
        overlayClassName="Overlay"
      >
        <button className="w-[16px] md:w-[12px] h-[16px] md:h-[12px] right-[28px] md:right-[23px] top-[28px] md:top-[21px] text-[#696679] cancel-btn" onClick={closeModal}></button>
        <div className="absolute top-[60px] md:top-[42px] md:left-[200px] left-[263px] md:w-[80px] md:h-[28px] text-center md:text-[20px] text-[#05001F] font-medium md:leading-[28px]">连接钱包</div>
        <button className="flex justify-between items-center w-[558px] md:w-[384px] h-[100px] md:h-[52px] px-[30px] md:px-[15px] py-[24px] md:py-[12px] mx-[48px] md:mx-[48px] mt-[148px] md:mt-[94px]  bg-[#FFFFFF] hover:bg-[#FAFAFF] rounded-[8px] md:rounded-[6px] border border-solid border-[#6953EF]" onClick={() => { connect('anyweb'); closeModal() }}>
          <span className="md:w-[61px] md:h-[22px] md:text-[16px] md:leading-[22px] font-normal text-[#37334C] text-left">Anyweb</span> 
          <img src={Unconnected} alt="unconnected logo" />
        </button>
        <button className="flex justify-between items-center w-[558px] md:w-[384px] h-[100px] md:h-[52px] px-[30px] md:px-[15px] py-[24px] md:py-[12px] mx-[48px] md:mx-[48px] mt-[24px] md:mt-[12px]  bg-[#FFFFFF] hover:bg-[#FAFAFF] rounded-[8px] md:rounded-[6px] border border-solid border-[#6953EF]" onClick={() => { connect('cellar'); closeModal() }}>
          <span className="md:w-[81px] md:h-[22px] md:text-[16px] md:leading-[22px] font-normal text-[#37334C] text-left">Cellar晒啦</span> 
          <img src={Unconnected} alt="unconnected logo" />
        </button>
    </Modal>
  )
})


const RectangleDropdownContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-evenly">
      <div className="flex justify-center items-center cursor-pointer h-[104px] md:h-[54px] w-[654px] mb-[10px] md:mb-[6px] md:w-[300px]  bg-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#ffffff]" onClick={() => connect('anyweb')}>
        Anyweb
      </div>
      <div className="flex justify-center items-center cursor-pointer h-[104px] md:h-[54px] w-[654px] md:w-[300px] bg-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#ffffff]" onClick={() => connect('cellar')}>
        Cellar
      </div>
    </div>
  );
};

const CircleConnectButton: React.FC = () => {
  const modalRef = useRef(null);

  return (
    <>
      <button className="flex flex-row items-center px-[24px] md:px-[16px] h-[64px] md:h-[42px]  text-[#6953EF] text-[24px] md:text-[16px] leading-[32px] md:leading-[22px] border-[2px] md:border-[1px] border-[#6953EF] rounded-[32px] md:rounded-[21px]" onClick={()=>modalRef?.current?.openModal()}>
        <img src={Unconnected} alt="unconnected logo" className="w-[16px] md:w-[10px] h-[16px] md:h-[10px] mr-[16px] md:mr-[8px] select-none" draggable={false} />
        连接钱包
      </button>
      <ConnectModal ref={modalRef}/>
    </>
  );
};

const RectangleConnectButton: React.FC = () => {
  const modalRef = useRef(null);
  
  return (
    <>
      <button className="mt-[60px] md:mt-[24px] flex justify-center items-center h-[104px] md:h-[54px] w-[654px] md:w-[300px] bg-[#6953EF] rounded-[8px] md:rounded-[4px] text-[32px] md:text-[16px] font-medium leading-[40px] md:leading-[22px] text-[#ffffff]" onClick={()=>modalRef?.current?.openModal()}>
        连接钱包
      </button>
      <ConnectModal ref={modalRef}/>
    </>
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
