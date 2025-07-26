import React, { useState, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useAuth } from '../context/AuthContext';
import { Backdrop } from '@mui/material';
import { useData } from '../context/DataContext';
import { useOutlet, Outlet } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useTheme } from '../context/theme-provider';

const DefaultLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const currentOutlet = useOutlet();
  const [backDropOpen, setBackDropOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; 
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = (open: boolean) => {
    console.log('Setting sidebar to:', open);
    setSidebarOpen(open);
  };

  return (
    <div className={cn(
      "flex h-screen overflow-hidden",
      theme === 'dark' ? 'dark' : ''
    )}>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden',
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => handleSidebarToggle(false)}
      />

      <aside
        className={cn(
          'fixed lg:relative inset-y-0 left-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
          sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebarToggle} />
      </aside>

      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      )}>
        <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebarToggle} />
        </header>

        <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
