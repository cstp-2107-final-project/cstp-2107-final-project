import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth, signOut } from "../auth/guards";

export default function MainLayout() {
  const auth = useAuth();
  const nav = useNavigate();
  const isAdmin = auth?.role === "admin";

  const linkCls = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 ${isActive ? "bg-white/15 font-medium" : ""}`;

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-slate-50">
      {/* Sidebar */}
      <aside className="bg-indigo-700 text-white p-4 space-y-4">
        <div className="text-xl font-bold">🐾 Pet Clinic</div>
        <nav className="space-y-1">
          <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
          <NavLink to="/pets" className={linkCls}>Pets</NavLink>
          <NavLink to="/appointments" className={linkCls}>Appointments</NavLink>
          <NavLink to="/vaccinations" className={linkCls}>Vaccinations</NavLink>
          <NavLink to="/billing" className={linkCls}>Billing</NavLink>
          {isAdmin && <NavLink to="/admin-data" className={linkCls}>Admin Panel</NavLink>}
        </nav>
        <div className="mt-6 text-xs opacity-80">
          {auth?.name} · {auth?.role}
        </div>
        <button
          className="mt-2 text-sm underline"
          onClick={() => { signOut(); nav("/login"); }}
        >
          Sign out
        </button>
      </aside>

      {/* Main */}
      <main className="p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-slate-800">
            {isAdmin ? "Clinic Dashboard" : "Client Dashboard"}
          </h1>
        </header>
        <div className="bg-white rounded-xl shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
