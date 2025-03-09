import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Dashboard/sidebar';
import Topbar from './Dashboard/Topbar';

const Dashboard = () => {

    const {user} = useAuth()

    if (!user) {
        // return <Navigate to="/" />;
      }
    

  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Navbar */}
        <Topbar></Topbar>

        {/* Dynamic Content */}
        <div className=" flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;