import { isEqual } from 'lodash-es';
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
      fetcher = fetch(`/api/${path}`, {
        ...requestParams,
        headers: { 'content-Type': 'application/json' },
      }).then((response) => response.json());
    else {
      fetcher = fetch(isLocalhost ? `/api/${path}` : `https://console.nftrainbow.cn/apps/${path}`, requestParams).then((response) => response.json());
    }
  }

  if (isPromise(fetcher)) {
    return fetcher.then((result) => {
      if (typeof equalKey !== 'string') return result;

      const lastResult = equalMap.get(equalKey);
      if (isEqual(lastResult, result)) {
        throw new Error('fetchApi: equal');
      } else {
        equalMap.set(equalKey, result);
        return result;
      }
    });
  }
}
