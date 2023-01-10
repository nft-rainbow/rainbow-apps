import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Rainbow from '@assets/rainbowIcon.png';
import Bg from '@assets/bg.png';
import Navigation from '@modules/Navigation';
import useActivityId from '@hooks/useActivityId';
import Home from '@pages/Home';
import Success from '@pages/Success';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouterWrapper />}>
          <Route index element={<Home />} />
          <Route path="success" element={<Success />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </Router>
  );
};

const RouterWrapper: React.FC = () => {
  const activityId = useActivityId();

  // TODO: Suspense
  return (
    <div className="relative flex flex-col min-h-full overflow-hidden">
      <img src={Bg} className="absolute w-full h-full select-none pointer-events-none" draggable={false} />
      <Navigation />
      <main className="flex-1 z-10">
        {typeof activityId === 'string' && (
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        )}
        {typeof activityId !== 'string' && <div className="mt-[100px] text-[24px] text-center text-red-400">Error url: No acticity_id.</div>}
      </main>
      <footer className="mt-[60px] mb-[36px] flex flex-row justify-center items-center z-20">
        <img src={Rainbow} alt="Rainbow" className="w-[228px] h-[54px] select-none pointer-events-none" draggable={false} />
        <span className="ml-[4px] text-[24px] leading-[33px]">提供技术支持</span>
      </footer>
    </div>
  );
};
export default AppRouter;
