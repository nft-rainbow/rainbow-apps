import { Chain, ChainEnv } from "cfxmap-js-sdk";
import { atom } from 'recoil';
import { setRecoil } from 'recoil-nexus';
import { persistAtom } from '@utils/recoilUtils';
import { isProduction } from '@utils/consts';
import { type sendTransaction as sendParams } from '@cfxjs/use-wallet-react/conflux/Fluent';
import { doShare, postCode } from '@services/poap';

const cellar = new Chain({
  appId: isProduction ? '2f04420b4221433b9baafb4aeecbff4b' : '84a131626ec245939f3d83e6ea01cb08',
  env: isProduction ? ChainEnv.PRO : ChainEnv.PRE,
});

export const accountState = atom<string | null | undefined>({
  key: 'cellarAccountState',
  default: null,
  effects: [
    persistAtom,
    ({ setSelf }) => {
      cellar
        .request({
          method: 'chain_loginState',
        })
        .then((res: Account) => {
          const account = res?.userWallet;
          setSelf(account);
        })
        .catch(() => {
          setSelf(null);
        });
    },
  ],
});

interface Account {
  authorityCode: string;
  userCode: string;
  userWallet: string;
  phone: string;
  userToken: string;
}

export const connect = async () =>
    cellar
        .request({
            method: 'cfx_accounts',
        })
        .then((res: Account) => {
            const account = res?.userWallet;
            setRecoil(accountState, account);
            if(res?.userWallet){
                doShare(res.userWallet);
                postCode({
                    address: res.userWallet, 
                    code: res.userToken,
                    wallet: 'cellar',
                    chain: isProduction ? 'conflux' : 'conflux_test',
                });
            }
        });

export const disconnect = async () =>
  cellar.request({
    method: 'chain_loginOut',
  });

export const sendTransaction = (params: Parameters<typeof sendParams>[0]) =>
  cellar.request({
    method: 'cfx_sendTransaction',
    params: [params],
  });

export const switchChain = () => {
  // targetChainId
};
