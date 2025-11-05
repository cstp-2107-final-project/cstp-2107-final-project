import { Link, Outlet, useLocation } from "react-router-dom";
import { FaDog, FaClipboardList, FaSyringe, FaFileInvoiceDollar, FaTachometerAlt } from "react-icons/fa";

export default function MainLayout() {
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/pets", label: "Pets", icon: <FaDog /> },
    { to: "/appointments", label: "Appointments", icon: <FaClipboardList /> },
    { to: "/vaccinations", label: "Vaccinations", icon: <FaSyringe /> },
    { to: "/billing", label: "Billing", icon: <FaFileInvoiceDollar /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col">
        <div className="text-center py-6 border-b border-blue-500">
          <h1 className="text-2xl font-bold">🐾 Pet Clinic</h1>
        </div>
        <nav className="flex-1 p-4 space-y-3">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 p-2 rounded-lg transition ${
                pathname === to
                  ? "bg-blue-500"
                  : "hover:bg-blue-600/40"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
        <footer className="p-4 text-sm text-blue-200 text-center border-t border-blue-600">
          © 2025 PetCare
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Clinic Dashboard</h2>
          <div className="text-sm text-gray-500">Admin Panel</div>
        </header>

        <section className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
