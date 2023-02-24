import { isEqual } from 'lodash-es';
import { showToast } from '@components/showToast';
import { isFunction, isPromise } from '../is';
const isLocalhost = globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1';

interface FetchParams {
  path?: string;
  method?: string;
  params?: any;
  equalKey?: string;
}

type RequestParams = Parameters<typeof fetch>[1];

const equalMap = new Map<string, any>();

export function fetchApi<T extends any>(fetcher: () => Promise<any>, equalKey?: string): Promise<T>;
export function fetchApi<T extends any>(fetchParams: Omit<FetchParams, 'equalKey'>, equalKey?: string): Promise<T>;
export function fetchApi() {
  const param: FetchParams | (() => Promise<any>) = arguments[0];
  const equalKey: string = arguments[1];

  let fetcher: Promise<any>;
  if (isFunction(param)) {
    fetcher = param();
  } else {
    let { path, method, params } = param;
    const bodyParams = params ?? {};
    method = method ?? 'GET';
    const requestParams: RequestParams = {
      body: JSON.stringify(bodyParams),
      method: method,
    };
    if (method == 'GET') delete requestParams.body;
    if (method == 'POST')
      fetcher = fetch(isLocalhost ? `/api/${path}` : `https://dev.nftrainbow.cn/apps/${path}`, {
        ...requestParams,
        headers: { 'content-Type': 'application/json' },
      }).then((response) => response.json());
    else {
      fetcher = fetch(isLocalhost ? `/api/${path}` : `https://dev.nftrainbow.cn/apps/${path}`, requestParams).then((response) => response.json());
    }
  }

  if (isPromise(fetcher)) {
    return fetcher
      .then((result) => {
        if (typeof result === 'object' && (result as any)?.code === 429) throw new Error('overloaded');
        if (typeof equalKey !== 'string') return result;
        const lastResult = equalMap.get(equalKey);
        if (isEqual(lastResult, result)) {
          throw new Error('fetchApi: equal');
        } else {
          equalMap.set(equalKey, result);
          return result;
        }
      })
      .catch((error) => {
        if (String(error).includes('overloaded')) {
          showToast({ content: '超过当日请求次数限制，请明天再来', type: 'failed' });
        } else {
          throw error;
        }
      });
  }
}

export function intervalFetchApi<T extends any>(fetcher: () => Promise<any>, conf: { intervalTime: number; callback: (res: T) => void; equalKey?: string }): VoidFunction;
export function intervalFetchApi<T extends any>(fetchParams: FetchParams, conf: { intervalTime: number; callback: (res: T) => void; equalKey?: string }): VoidFunction;
export function intervalFetchApi() {
  const conf: { intervalTime: number; callback: (res: any) => void; equalKey?: string } = arguments[1];
  if (typeof conf?.callback !== 'function' || typeof conf?.intervalTime !== 'number') return () => {};

  fetchApi(arguments[0], conf?.equalKey)
    .then(conf.callback)
    .catch(() => {});

  const interval = setInterval(
    () =>
      fetchApi(arguments[0], conf?.equalKey)
        .then(conf.callback)
        .catch(() => {}),
    conf.intervalTime
  ) as unknown as number;

  return () => {
    if (interval !== null) {
      clearInterval(interval);
    }
  };
}
