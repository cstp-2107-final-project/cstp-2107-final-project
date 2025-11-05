import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard";
import Pets from "./pages/pets";
import Appointments from "./pages/appointments";
import Vaccinations from "./pages/Vaccinations";
import Billing from "./pages/billing";
import Home from "./pages/home";
import Login from "./pages/login";
import About from "./pages/about";
import AdminData from "./pages/AdminData";

export default function App() {
  return (
    <Routes>
      {/* Routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/vaccinations" element={<Vaccinations />} />
        <Route path="/billing" element={<Billing />} />
      </Route>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin-data" element={<AdminData />} />
    </Routes>
  );
}
