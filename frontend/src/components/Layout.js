import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
