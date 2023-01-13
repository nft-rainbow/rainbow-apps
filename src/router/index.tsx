import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Rainbow from '@assets/rainbowIcon.png';
import Bg from '@assets/bg.png';
import Navigation from '@modules/Navigation';
import { ToastRender } from '@components/showToast';
import useActivityId from '@hooks/useActivityId';
import { usePoapConfWatchAccount, usePoapConfig } from '@services/poap';
import Home from '@pages/Home';
// import Success from '@pages/Success';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouterWrapper />}>
          <Route index element={<Home />} />
          {/* <Route path="success" element={<Success />} /> */}
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
  console.log(error);
  return (
    <div className="relative flex flex-col min-h-full overflow-hidden">
      <img src={Bg} className="absolute w-full h-full select-none pointer-events-none z-[-1]" draggable={false} />
      <Navigation />
      {!error ? (
        <main className="flex-1 z-10">
          {typeof activityId === 'string' && <Outlet />}
          {typeof activityId !== 'string' && <div className="mt-[100px] text-[24px] text-center text-red-400">错误的 url: 没有 activity_id。</div>}
        </main>
      ) : (
        <div className="mt-[100px] text-[24px] text-center text-red-400">
          {String(error).indexOf('No activity') ? `该 activity_id - ${activityId} 没有活动。` : '获取信息失败, 刷新页面重试。'}
        </div>
      )}

      <footer className="mt-[60px] mb-[36px] flex flex-row justify-center items-center z-20">
        <img src={Rainbow} alt="Rainbow" className="w-[228px] h-[54px] select-none pointer-events-none" draggable={false} />
        <span className="ml-[4px] text-[24px] leading-[33px]">提供技术支持</span>
      </footer>
      <ToastRender />
    </div>
  );
};
export default AppRouter;
