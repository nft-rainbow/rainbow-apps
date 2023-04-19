/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'cellar-js-sdk' {
  export const CellarEnv = { PRO: '', PRE: '', DEV: '' } as { PRO: string; PRE: string; DEV: string };
  export class Cellar {
    constructor(params: { appId: string; env: string }) {}
    request: (parms: any) => any;
  }
}