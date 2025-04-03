import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Sidebar from './Dashboard/sidebar';
import Topbar from './Dashboard/Topbar';

const Dashboard = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    // Effect to handle the 5-second delay
    useEffect(() => {
        if (!user) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000); // 5000ms = 5 seconds

            // Cleanup timeout on component unmount or if user changes
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [user]);

    // Show loading state for 5 seconds before redirecting
    if (!user && isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-200">
                <div className="text-center">
                    <p>Loading...</p>
                    {/* You could also add a spinner here */}
                </div>
            </div>
        );
    }

    // Redirect after loading if no user
    if (!user && !isLoading) {
        return <Navigate to="/" />;
    }

    // Main dashboard render when user is authenticated
    return (
        <div className="flex min-h-screen bg-gray-200">
            {/* Sidebar */}
            <Sidebar></Sidebar>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-gray-100">
                {/* Top Navbar */}
                <Topbar></Topbar>

                {/* Dynamic Content */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;