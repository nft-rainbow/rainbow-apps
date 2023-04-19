import { atom } from 'recoil';
import { setRecoil, getRecoil } from 'recoil-nexus';
import { persistAtom } from '@utils/recoilUtils';
import { Provider } from '@idealight-labs/anyweb-js-sdk';
import { isProduction } from '@utils/consts';
import { sendTransaction as send } from '@cfxjs/use-wallet-react/conflux/Fluent';
import { hideModal } from '@components/showModal';
import { doShare, postCode } from '@services/poap';

export const provider = new Provider({
  logger: console,
  appId: '0100ec60-fb4d-4956-9827-3fdccebad751',
});

interface Account {
  address: Array<string | null | undefined>;
  code: string;
}

export const accountState = atom<string | null | undefined>({
  key: 'anywebAccountState',
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
                  const { address, code } = account;
                  setSelf(address?.[0]);
                  if (address?.[0]) {
                    doShare(address[0]);
                    if (code) {
                      postCode({address:address[0], code, wallet: 'anyweb'});
                    }
                  }
                });
            }
          });
      });
    },
  ],
});


export const connect = async () =>
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
      hideModal();
      const account = result as Account;
      const { address, code } = account;
      setRecoil(accountState, address[0]);
      if (address?.[0]) {
        doShare(address[0]);
        if (code) {
          postCode({address:address[0], code, wallet: 'anyweb'});
        }
      }
    })

export const disconnect = async () =>
  provider
    .request({
      method: 'anyweb_logout',
    })

export const sendTransaction = (params: Parameters<typeof send>[0]) =>
  provider.request({
    method: 'cfx_sendTransaction',
    params: [
      {
        ...params,
        from: getRecoil(accountState),
      },
    ],
  });

export const switchChain = () => {
  // targetChainId
};
