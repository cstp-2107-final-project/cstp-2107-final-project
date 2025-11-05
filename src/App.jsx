import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/dashboard";
import Pets from "./pages/pets";
import Appointments from "./pages/appointments";
import Vaccinations from "./pages/Vaccinations";
import Billing from "./pages/billing";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/vaccinations" element={<Vaccinations />} />
        <Route path="/billing" element={<Billing />} />
      </Route>
    </Routes>
  );
}
