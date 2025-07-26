import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";
import { Bug, Lightbulb, BadgeCheck, MessageSquare, HelpCircle, Settings } from 'lucide-react';
import Logo from '../../../dist/favicon.ico';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navigationItems = [
  {
    name: 'Problems',
    href: '/home',
    icon: Lightbulb
  },
  {
    name: 'How it works',
    href: '/how-it-works',
    icon: Bug
  },
  {
    name: 'Why Us',
    href: '/why-us',
    icon: MessageSquare
  },
  {
    name: 'Testimonials',
    href: '/testimonials',
    icon: BadgeCheck
  },
  {
    name: 'FAQs',
    href: '/faqs',
    icon: HelpCircle
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`flex h-full flex-col bg-gradient-to-b from-gray-950 to-blue-950 transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700/50">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            <img src={Logo} alt='Logo' className="h-6 w-6"/>
          </div>
          {!collapsed && (
            <span className="text-xl font-semibold text-white">
              SwapXchange
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10"
        >
          <svg
            className={`h-5 w-5 text-white/70 transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col flex-1">
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors text-white hover:bg-white/10',
                location.pathname === item.href
                    ? 'text-white'
                    : 'text-white/70 group-hover:text-white',
                collapsed ? 'justify-center' : ''
              )}
            >
              <item.icon
                className={cn(
                  'h-5 w-5 flex-shrink-0',
                  location.pathname === item.href
                    ? 'text-white'
                    : 'text-white/70 group-hover:text-white'
                )}
              />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {isAuthenticated && user && (
          <div className="mt-auto border-t border-gray-700/50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.fullName?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.fullName || 'User'}
                  </p>
                  <p className="text-xs text-white/70 truncate">
                    {user.email || 'user@example.com'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
