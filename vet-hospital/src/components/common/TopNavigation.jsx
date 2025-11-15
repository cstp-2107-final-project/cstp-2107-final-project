import React from 'react';
import { Home, ChevronRight, Bell, Menu, X, LogOut } from 'lucide-react';

const TopNavigation = ({ currentUser, currentPage, sidebarOpen, setSidebarOpen, onLogout }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-orange-600 p-2 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center space-x-2 text-white">
            <Home className="w-5 h-5" />
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium capitalize">{currentPage}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-white hover:bg-orange-600 p-2 rounded-lg transition relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">{getInitials(currentUser.fullName)}</span>
            </div>
            <div className="text-white">
              <p className="font-medium">{currentUser.fullName}</p>
              <p className="text-xs text-orange-100 capitalize">{currentUser.role}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="text-white hover:bg-orange-600 p-2 rounded-lg transition"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;