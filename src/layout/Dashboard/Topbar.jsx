import React from 'react';

const Topbar = () => {
    return (
        <header className="flex justify-between items-center bg-white p-4 shadow-md">
          <input
            type="text"
            placeholder="Search Here"
            className="w-52 p-2 rounded-md border-none bg-gray-100 focus:outline-none shadow-sm placeholder-gray-500"
          />
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">🔔</span>
            <img
              src="https://via.placeholder.com/30"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-xl text-gray-700">⋮</span>
          </div>
        </header>
    );
};

export default Topbar;