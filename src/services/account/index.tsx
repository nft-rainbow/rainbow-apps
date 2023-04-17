import { atom, selector, useRecoilValue } from 'recoil';
import { setRecoil, getRecoil } from 'recoil-nexus';
import { persistAtom } from '@utils/recoilUtils';
import {
  accountState as anywebAccountState,
  connect as connectAnyweb,
  disconnect as disconnectAnyweb,
  switchChain as switchChainAnyweb,
  sendTransaction as sendTransactionWithAnyweb,
} from './anyweb';
import {
  accountState as cellarAccountState,
  connect as connectCellar,
  disconnect as disconnectCellar,
  switchChain as switchChainCellar,
  sendTransaction as sendTransactionWithCellar,
} from './cellar';
import { type sendTransaction as sendTransactionWithFluent } from '@cfxjs/use-wallet-react/conflux';
import { hideModal } from '@components/showModal';

const methodsMap = {
  anyweb: {
    accountState: anywebAccountState,
    connect: connectAnyweb,
    switchChain: switchChainAnyweb,
    sendTransaction: sendTransactionWithAnyweb,
    disconnect: disconnectAnyweb,
  },
  cellar: {
    accountState: cellarAccountState,
    connect: connectCellar,
    switchChain: switchChainCellar,
    sendTransaction: sendTransactionWithCellar,
    disconnect: disconnectCellar,
  },
} as const;

type Methods = keyof typeof methodsMap;

export const accountMethodFilter = atom<Methods | null>({
  key: 'accountMethodFilter',
  default: null,
  effects: [persistAtom],
});

export const accountState = selector({
  key: 'account',
  get: ({ get }) => {
    const filter = get(accountMethodFilter);
    if (!filter || !methodsMap[filter]) return null;

    const { accountState } = methodsMap[filter];
    return get(accountState);
  },
});

export const chainIdState = selector({
  key: 'chainIdState',
  get: ({ get }) => {
    const filter = get(accountMethodFilter);
    if (!filter) return null;

    const account = get(accountState);
    if (!account) return null;
    if (account.startsWith('cfxtest')) return '1';
    return '1029';
  },
});

export const getAccountMethod = () => getRecoil(accountMethodFilter);
export const getAccount = () => getRecoil(accountState);

export const connect = async (method: Methods) => {
  try {
    await methodsMap[method].connect();
    setRecoil(accountMethodFilter, method);
    hideModal();
  } catch (err) {
    throw err;
  }
};

export const disconnect = async (method: Methods) => {
  try {
    await methodsMap[method].disconnect();
    setRecoil(accountMethodFilter, null);
  } catch (_) {}
};

export const switchChain = () => {
  const method = getAccountMethod();
  if (!method) return;
  methodsMap[method].switchChain();
};

export const sendTransaction = async (params: Parameters<typeof sendTransactionWithFluent>[0] & { from: string }) => {
  const accountMethod = getAccountMethod();
  if (!accountMethod) {
    throw new Error('No account connected');
  }
  return methodsMap[accountMethod].sendTransaction(params) as unknown as string;
};

export const useAccount = () => useRecoilValue(accountState);
export const useAccountMethod = () => useRecoilValue(accountMethodFilter);
export const useChainId = () => useRecoilValue(chainIdState);
