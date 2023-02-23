import React, { type ReactNode } from 'react';
import { atom, useRecoilValue } from 'recoil';
import cx from 'clsx';
import Close from '@assets/delete.svg';
import renderReactNode from '@utils/renderReactNode';
import { setRecoil } from 'recoil-nexus';

interface Modal {
  content: ReactNode;
  className?: string;
}

const modalState = atom<Modal | null>({
  key: 'modalState',
  default: null,
});

export const showModal = (param: Omit<Modal, 'id'>) => {
  setRecoil(modalState, () => {
    return {
      content: param.content,
      className: param.className ?? '',
    };
  });
};

export const hideModal = () => {
  setRecoil(modalState, () => {
    return null;
  });
};

export const ModalRender: React.FC = () => {
  const modal = useRecoilValue(modalState);
  if (!modal) return <></>;
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center bg-[rgba(0,0,0,0.6)] z-40">
      <div
        className={cx(
          'relative top-[22%] flex flex-col jusity-center w-[90vw] max-w-[560px] p-[28px] rounded-[8px] bg-white overflow-hidden dropdown-shadow z-50',
          modal.className
        )}
      >
        <div className="flex flex-row justify-end items-center w-full text-[22px] text-[#303549] font-semibold z-50">
          <button className="w-[36px] h-[36px] rounded-full" onClick={hideModal}>
            <img src={Close} alt="delete svg" />
          </button>
        </div>
        {renderReactNode(modal.content)}
      </div>
    </div>
  );
};
