/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'cfxmap-js-sdk' {
  export const ChainEnv = { PRO: '', PRE: '', DEV: '' } as { PRO: string; PRE: string; DEV: string };
  export class Chain {
    constructor(params: { appId: string; env: string }) {}
    request: (parms: any) => any;
  }
}