// src/App.jsx
import { Routes, Route, Navigate, Link } from "react-router-dom";

import Home from "./frontend/pages/home.jsx";
import Login from "./frontend/pages/login.jsx";
import Signup from "./frontend/pages/signup.jsx";

import AdminDashboard from "./frontend/pages/AdminData.jsx";
import OwnerDashboard from "./frontend/pages/OwnerDashboard.jsx";

import PetsPage from "./frontend/pages/pets.jsx";
import AppointmentsPage from "./frontend/pages/appointments.jsx";
import VaccinationsPage from "./frontend/pages/Vaccinations.jsx";
import BillingPage from "./frontend/pages/billing.jsx";

import { useAuth } from "./auth/guards.jsx";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold text-slate-800">
            Paws &amp; Care Clinic
          </Link>
          <div className="flex items-center gap-3 text-xs">
            {user && (
              <span className="text-slate-600">
                Logged in as{" "}
                <span className="font-medium">
                  {user.name || user.email} ({user.role})
                </span>
              </span>
            )}
            {user ? (
              <button
                onClick={logout}
                className="px-3 py-1 rounded-lg border border-slate-300 text-slate-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded-lg border border-slate-300 text-slate-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Routed content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Owner */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pets"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <PetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vaccinations"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <VaccinationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/billing"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <BillingPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
