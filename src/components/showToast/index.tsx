import React from 'react';
import { atom, useRecoilValue } from 'recoil';
import cx from 'clsx';
import { setRecoil } from 'recoil-nexus';
import { uniqueId } from 'lodash-es';

interface Toast {
  content: string | React.ReactNode;
  type: 'success' | 'warning' | 'failed';
  bgColor?: string;
  id: string;
}

const toastsState = atom<Array<Toast>>({
  key: 'toastState',
  default: [],
});

export const showToast = (param: Omit<Toast, 'id'>) => {
  setRecoil(toastsState, (cur) => {
    const newArr = cur ? [...cur] : [];
    const id = uniqueId();
    newArr.push({ ...param, id });

    setTimeout(() => {
      setRecoil(toastsState, (curAfter) => {
        let newAfter = curAfter ? [...curAfter] : [];
        newAfter = newAfter.filter(toast => toast.id !== id);
        return newAfter;
      });
      //TODO:
    }, 2000);
    return newArr;
  });
};

export const ToastRender: React.FC = () => {
  const toasts = useRecoilValue(toastsState);
  return (
    <div className="fixed left-0 top-[190px] right-0 pointer-events-none flex flex-col justify-center items-center gap-[12px]">
      {toasts.map(({ content, type, bgColor, id }) => (
        <div key={id} className={cx('px-[42px] h-[72px] flex justify-center items-center text-[28px] leading-[36px] text-[#FFFFFF] rounded-[42px]', bgColor)}>{content}</div>
      ))}
    </div>
  );
};
