import React from 'react';
import ReactDOM from 'react-dom/client';
import RecoilNexus from 'recoil-nexus';
import { RecoilRoot } from 'recoil';
import { Toast } from '@components/showPopup';
import AppRouter from './router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilNexus />
      <Toast.Provider />
      <AppRouter />
    </RecoilRoot>
  </React.StrictMode>
);
