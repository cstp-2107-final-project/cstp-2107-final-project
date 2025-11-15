import React, { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import TopNavigation from './components/common/TopNavigation';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAppointments from './components/admin/AdminAppointments';
import AdminVaccinations from './components/admin/AdminVaccinations';
import AdminBilling from './components/admin/AdminBilling';
import AdminDoctors from './components/admin/AdminDoctors';
import AdminPets from './components/admin/AdminPets';
import OwnerDashboard from './components/owner/OwnerDashboard';
import OwnerAppointments from './components/owner/OwnerAppointments';
import OwnerVaccinations from './components/owner/OwnerVaccinations';
import Login from './components/auth/Login';
import { users } from './data/mockData';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  // Render current page based on user role
  const renderPage = () => {
    if (!currentUser) return null;

    if (currentUser.role === 'admin') {
      switch (currentPage) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'appointments':
          return <AdminAppointments />;
        case 'vaccinations':
          return <AdminVaccinations />;
        case 'billing':
          return <AdminBilling />;
        case 'doctors':
          return <AdminDoctors />;
        case 'pets':
          return <AdminPets />;
        default:
          return <AdminDashboard />;
      }
    } else {
      switch (currentPage) {
        case 'dashboard':
        case 'pets':
          return <OwnerDashboard ownerId={currentUser.id} />;
        case 'appointments':
          return <OwnerAppointments ownerId={currentUser.id} />;
        case 'vaccinations':
          return <OwnerVaccinations ownerId={currentUser.id} />;
        default:
          return <OwnerDashboard ownerId={currentUser.id} />;
      }
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar 
        userRole={currentUser.role}
        userName={currentUser.fullName}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <TopNavigation 
          currentUser={currentUser}
          currentPage={currentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={handleLogout}
        />

        <div className="p-6">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default App;