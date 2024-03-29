import { isEqual } from 'lodash-es';
import { showToast } from '@components/showToast';
import { isFunction, isPromise } from '../is';
import { isProduction } from '@utils/consts';

const isLocalhost = globalThis.location.hostname === 'localhost' || globalThis.location.hostname === '127.0.0.1';

function buildUrl(path: string) {
    return isLocalhost ? `/api/${path}` : (isProduction ? `https://console.nftrainbow.cn/apps/${path}` : `http://dev.nftrainbow.cn/apps/${path}`);
}

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
        const fetchUrl = buildUrl(path as string);
        if (method == 'POST')
        fetcher = fetch(fetchUrl, {
            ...requestParams,
            headers: { 'content-Type': 'application/json' },
        }).then((response) => response.json());
        else {
            fetcher = fetch(fetchUrl, requestParams).then((response) => response.json());
        }
    }

    if (isPromise(fetcher)) {
        return fetcher
            .then((result) => {
                if (typeof result === 'object' && (result as any)?.code === 42900) throw new Error('overloaded');
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
                    showToast({ content: '超过当日请求次数限制，请明天再来', type: 'failed', key: 'overloaded' });
                } else {
                    throw error;
                }
            });
    }
}

export function intervalFetchApi<T extends any>(fetcher: () => Promise<any>, conf: { intervalTime: number; callback: (res: T) => void; equalKey?: string }): VoidFunction;

export function intervalFetchApi<T extends any>(fetchParams: FetchParams, conf: { intervalTime: number; callback: (res: T) => void; equalKey?: string }): VoidFunction;

export function intervalFetchApi() {
    const conf: { 
        intervalTime: number; 
        callback: (res: any) => void; equalKey?: string 
    } = arguments[1];
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
