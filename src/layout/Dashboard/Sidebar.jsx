import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
    const {logout} = useAuth()
    return (
        <aside className="w-64 bg-blue-600 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">ALEX</h1>
        <nav className="space-y-4 flex-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">🏠</span> Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">📊</span> Dashboard
          </NavLink>
          <NavLink
            to="all-users"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">👤</span> All Users
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">📅</span> Profile
          </NavLink>
         
          <NavLink
            onClick={logout}
            className="flex items-center p-3 rounded-md text-white hover:bg-blue-700 transition-colors"
          >
            <span className="mr-3">➡️</span> Sign out
          </NavLink>
        </nav>
      </aside>
    );
};

export default Sidebar;