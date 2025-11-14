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

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 text-slate-800">
      {/* Top Nav */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-green-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-lg font-extrabold text-green-700 tracking-tight hover:text-green-900 transition"
          >
            🐾 Paws & Care Clinic
          </Link>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 text-sm">
            {user && (
              <span className="text-slate-600">
                Logged in as{" "}
                <span className="font-semibold text-green-700">
                  {user.name || user.email} ({user.role})
                </span>
              </span>
            )}

            {/* Auth Buttons */}
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Routed pages */}
      <main className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
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
