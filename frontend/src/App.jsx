import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";

// Layout Components
import Sidebar from './components/common/Sidebar';
import TopNavigation from './components/common/TopNavigation';

// AUTH
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// ADMIN PAGES
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminAppointments from "./components/admin/AdminAppointments";
import AdminVaccinations from "./components/admin/AdminVaccinations";
import AdminBilling from "./components/admin/AdminBilling";
import AdminDoctors from "./components/admin/AdminDoctors";
import AdminPets from "./components/admin/AdminPets";

// OWNER PAGES
import OwnerDashboard from "./components/owner/OwnerDashboard";
import OwnerAppointments from "./components/owner/OwnerAppointments";
import OwnerVaccinations from "./components/owner/OwnerVaccinations";

// DOCTOR PAGES
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import DoctorAppointments from "./components/doctor/DoctorAppointments";
import DoctorPatients from "./components/doctor/DoctorPatients";

export default function App() {
  const { user, role, loading, logout } = useAuth();

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showSignup, setShowSignup] = useState(false);

  if (loading) return <div className="p-6">Loading...</div>;

  // -----------------------------
  // NOT LOGGED IN
  // -----------------------------
  if (!user) {
    if (showSignup) {
      return <Signup onSwitchToLogin={() => setShowSignup(false)} />;
    }
    return <Login onSwitchToSignup={() => setShowSignup(true)} />;
  }

  // -----------------------------
  // RENDER CORRECT PAGE BASED ON ROLE
  // -----------------------------
  const renderPage = () => {
    // ADMIN =====================
    if (role === "admin") {
      switch (currentPage) {
        case "dashboard": return <AdminDashboard />;
        case "appointments": return <AdminAppointments />;
        case "vaccinations": return <AdminVaccinations />;
        case "billing": return <AdminBilling />;
        case "doctors": return <AdminDoctors />;
        case "pets": return <AdminPets />;
        default: return <AdminDashboard />;
      }
    }

    // DOCTOR =====================
    if (role === "doctor") {
      switch (currentPage) {
        case "dashboard": return <DoctorDashboard />;
        case "appointments": return <DoctorAppointments />;
        case "patients": return <DoctorPatients />;
        default: return <DoctorDashboard />;
      }
    }

    // OWNER =====================
    if (role === "owner") {
      switch (currentPage) {
        case "dashboard":
        case "pets": return <OwnerDashboard ownerId={user.uid} />;
        case "appointments": return <OwnerAppointments ownerId={user.uid} />;
        case "vaccinations": return <OwnerVaccinations ownerId={user.uid} />;
        default: return <OwnerDashboard ownerId={user.uid} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <Sidebar
        userRole={role}
        userName={user.name}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
      />

      {/* MAIN AREA */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>

        {/* TOP NAV */}
        <TopNavigation
          currentUser={{ fullName: user.name, role }}
          currentPage={currentPage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          onLogout={logout}
        />

        <div className="p-6">{renderPage()}</div>
      </div>
    </div>
  );
}
