import React from 'react';
import { atom, useRecoilValue } from 'recoil';
import { setRecoil } from 'recoil-nexus';
import { uniqueId } from 'lodash-es';

interface Toast {
  content: string;
  type: 'success' | 'warning' | 'failed';
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
    }, 2000);
    return newArr;
  });
};

export const ToastRender: React.FC = () => {
  const toasts = useRecoilValue(toastsState);
  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 pointer-events-none flex flex-col justify-center items-center gap-[12px]">
      {toasts.map(({ content, type, id }) => (
        <div key={id}>{content}</div>
      ))}
    </div>
  );
};
