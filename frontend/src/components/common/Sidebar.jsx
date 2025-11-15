import React from 'react';
import { Home, Calendar, Users, Syringe, DollarSign, PawPrint, Stethoscope } from 'lucide-react';

const Sidebar = ({ userRole, userName, currentPage, setCurrentPage, sidebarOpen }) => {
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
            <PawPrint className="w-8 h-8" />
          </div>
        </div>
        
        <div className="text-center mb-8 pb-6 border-b border-gray-700">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold">
            {getInitials(userName)}
          </div>
          <p className="font-bold text-lg">{userName}</p>
          <p className="text-sm text-gray-400 capitalize">{userRole}</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-semibold mb-3 px-4">MAIN</p>
          
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          {userRole === 'admin' ? (
            <>
              <button
                onClick={() => setCurrentPage('appointments')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'appointments' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <Calendar className="w-5 h-5" />
                <span>Appointments</span>
              </button>

              <button
                onClick={() => setCurrentPage('pets')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'pets' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <PawPrint className="w-5 h-5" />
                <span>Pets</span>
              </button>

              <button
                onClick={() => setCurrentPage('doctors')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'doctors' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <Stethoscope className="w-5 h-5" />
                <span>Doctors</span>
              </button>

              <button
                onClick={() => setCurrentPage('vaccinations')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'vaccinations' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <Syringe className="w-5 h-5" />
                <span>Vaccinations</span>
              </button>

              <button
                onClick={() => setCurrentPage('billing')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'billing' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <DollarSign className="w-5 h-5" />
                <span>Billing</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentPage('pets')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'pets' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <PawPrint className="w-5 h-5" />
                <span>My Pets</span>
              </button>

              <button
                onClick={() => setCurrentPage('appointments')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'appointments' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <Calendar className="w-5 h-5" />
                <span>My Appointments</span>
              </button>

              <button
                onClick={() => setCurrentPage('vaccinations')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${currentPage === 'vaccinations' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              >
                <Syringe className="w-5 h-5" />
                <span>Vaccinations</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;