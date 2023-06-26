import { type AtomEffect } from 'recoil';
import LocalStorage from 'localstorage-enhance';

export const persistAtom: AtomEffect<any> = ({ setSelf, onSet, trigger, node: { key } }) => {
    if (trigger === 'get') {
        setSelf(LocalStorage.getItem(key));
    }

    onSet((data) => {
        LocalStorage.setItem({ key, data });
    });
};
