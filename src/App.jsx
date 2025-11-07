import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import OwnerDashboard from "./pages/OwnerDashboard"; // owner-only dashboard
import Pets from "./pages/pets";
import Appointments from "./pages/appointments";
import Vaccinations from "./pages/Vaccinations";
import Billing from "./pages/billing";
import Home from "./pages/home";
import Login from "./pages/login";
import About from "./pages/about";
import AdminData from "./pages/AdminData";
import { RoleGate } from "./auth/guards";

export default function App() {
  return (
    <Routes>
      {/* Protected shell for signed-in users */}
      <Route
        element={
          <RoleGate allow={["owner","admin"]}>
            <MainLayout />
          </RoleGate>
        }
      >
        {/* OWNER dashboard */}
        <Route path="/dashboard" element={<OwnerDashboard />} />

        {/* Role-aware feature pages (owner sees only theirs; keep your filtered versions) */}
        <Route path="/pets" element={<Pets />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/vaccinations" element={<Vaccinations />} />
        <Route path="/billing" element={<Billing />} />
      </Route>

      {/* ADMIN dashboard (separate) */}
      <Route
        path="/admin-data"
        element={
          <RoleGate allow={["admin"]}>
            <AdminData />
          </RoleGate>
        }
      />

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
