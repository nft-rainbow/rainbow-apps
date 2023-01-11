import { atom, useRecoilValue } from 'recoil';
import { setRecoil, getRecoil } from 'recoil-nexus';
import { Provider } from '@idealight-labs/anyweb-js-sdk';
import { persistAtom } from '@utils/recoilUtils';
import { isProduction } from '@utils/consts';
import { doShare } from '@services/poap';
import { showToast } from '@components/showToast';

interface Account {
  address: Array<string | null | undefined>;
}

export const provider = new Provider({
  logger: null,
  appId: '2889ac44-fd99-4867-a33a-282273b4963b',
});

export const accountState = atom<string | null | undefined>({
  key: 'accountState',
  default: null,
  effects: [
    persistAtom,
    ({ setSelf }) => {
      provider.on('ready', () => {
        provider
          .request({
            method: 'anyweb_loginstate',
            params: [],
          })
          .then((isLogined) => {
            if (!isLogined) {
              setSelf(null);
            } else {
              provider
                .request({
                  method: 'cfx_accounts',
                  params: [
                    {
                      availableNetwork: [isProduction ? 1029 : 1],
                      scopes: ['baseInfo', 'identity'],
                    },
                  ],
                })
                .then((result) => {
                  const account = result as Account;
                  const { address } = account;
                  setSelf(address?.[0]);
                  if (address?.[0]) {
                    doShare(address[0]);
                  }
                });
            }
          });
      });
    },
  ],
});

export const connect = async () => {
  provider
    .request({
      method: 'cfx_accounts',
      params: [
        {
          availableNetwork: [isProduction ? 1029 : 1],
          scopes: ['baseInfo', 'identity'],
        },
      ],
    })
    .then((result) => {
      const account = result as Account;
      const { address } = account;
      setRecoil(accountState, address?.[0]);
      if (address?.[0]) {
        doShare(address[0]);
      }
    })
    .catch((err) => {
      showToast({ content: `连接账户失败: ${err}`, type: 'failed', bgType: 'grey' });
      console.error(err);
    });
};

export const disconnect = async () => {
  provider
    .request({
      method: 'anyweb_revoke',
    })
    .then(() => { });
};

export const sendTransaction = (params: any) =>
  provider.request({
    method: 'cfx_sendTransaction',
    params: [
      {
        ...params,
        from: getRecoil(accountState),
      },
    ],
  });

export const useAccount = () => useRecoilValue(accountState);
