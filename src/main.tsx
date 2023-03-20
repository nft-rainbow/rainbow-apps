import React from 'react';
import ReactDOM from 'react-dom/client';
import RecoilNexus from 'recoil-nexus';
import { RecoilRoot } from 'recoil';
import AppRouter from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <AppRouter />
    </RecoilRoot>
  </React.StrictMode>
);
