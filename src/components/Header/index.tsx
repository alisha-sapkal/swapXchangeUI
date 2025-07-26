import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import { useData } from '../../context/DataContext';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DarkModeSwitcher from './DarkModeSwitcher';
// import { cn } from "../../utils/cn";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const { user, isAuthenticated } = useAuth();

  const handleMenuClick = () => {
    console.log('Menu button clicked');
    console.log('Current sidebar state:');
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-950">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <svg
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <DarkModeSwitcher />
      </div>
    </header>
  );
};

export default Header;
