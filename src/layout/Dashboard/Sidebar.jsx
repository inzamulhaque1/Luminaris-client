import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-blue-600 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">ALEX</h1>
        <nav className="space-y-4 flex-1">
          <NavLink
            to="/dashboard"
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
            to="/contact"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">👤</span> Contact
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">📅</span> Calendar
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-md text-white transition-colors ${
                isActive ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`
            }
          >
            <span className="mr-3">⚙️</span> Settings
          </NavLink>
          <NavLink
            to="/logout"
            className="flex items-center p-3 rounded-md text-white hover:bg-blue-700 transition-colors"
          >
            <span className="mr-3">➡️</span> Sign out
          </NavLink>
        </nav>
      </aside>
    );
};

export default Sidebar;