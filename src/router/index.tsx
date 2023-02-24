import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Rainbow from '@assets/rainbowIcon.png';
import Bg from '@assets/bg.png';
import Navigation from '@modules/Navigation';
import { ToastRender } from '@components/showToast';
import { ModalRender } from '@components/showModal';
import useActivityId from '@hooks/useActivityId';
import { usePoapConfWatchAccount, usePoapConfig } from '@services/poap';
import Home from '@pages/Home';
import Share from '@pages/Share';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouterWrapper />}>
          <Route index element={<Home />} />
          <Route path="share" element={<Share />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </Router>
  );
};

const RouterWrapper: React.FC = () => {
  const activityId = useActivityId();
  const { error } = usePoapConfig(activityId!);
  usePoapConfWatchAccount();
  return (
    <div className="relative flex flex-col min-h-full overflow-hidden">
      <img src={Bg} className="absolute w-full h-full select-none pointer-events-none z-[-1]" draggable={false} />
      <Navigation />
      {!error ? (
        <main className="flex-1">
          {typeof activityId === 'string' && <Outlet />}
          {typeof activityId !== 'string' && <div className="mt-[100px] text-[24px] text-center text-red-400">错误的 url: 没有 activity_id。</div>}
        </main>
      ) : (
        <div className="mt-[100px] text-[24px] text-center text-red-400">
          {String(error).indexOf('No activity') ? `该 activity_id - ${activityId} 没有活动。` : '获取信息失败, 刷新页面重试。'}
        </div>
      )}

      <footer className="mt-[60px] md:mt-[54px] mb-[36px] md:mb-[24px] z-20">
        <a target="_blank" href=" https://www.nftrainbow.cn/" className="flex flex-row justify-center items-center">
          <img src={Rainbow} alt="Rainbow" className="w-[228px] md:w-[135px] h-[54px] md:h-[32px] select-none pointer-events-none" draggable={false} />
          <span className="ml-[4px] text-[24px] md:text-[14px] leading-[33px] md:leading-[20px]">提供技术支持</span>
        </a>
      </footer>
      <ToastRender />
      <ModalRender />
    </div>
  );
};
export default AppRouter;
