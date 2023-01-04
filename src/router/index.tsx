import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Rainbow from '@assets/rainbowIcon.png'
import Navigation from '@modules/Navigation';
import Home from '@pages/Home';
import Success from '@pages/Success';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouterWrapper />} />
        <Route index element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path="success" element={<Success />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

const RouterWrapper: React.FC = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <footer className='mt-[42px] flex flex-row justify-center items-center'>
        <img src={Rainbow} alt="Rainbow" className='w-[228px] h-[54px] select-none pointer-events-none' draggable={false} /><span className='ml-[7px]'>提供技术支持</span>
      </footer>
    </>
  )
}
export default AppRouter;