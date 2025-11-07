import { loadDB } from "../store/db";
import { useAuth } from "../auth/guards";
import { FaDog, FaClipboardList, FaSyringe, FaFileInvoiceDollar } from "react-icons/fa";

export default function Dashboard() {
  const auth = useAuth(); // { email, role, name } (from localStorage via login.jsx)
  const db = loadDB() || {};
  const pets = db.pets || [];
  const owners = db.owners || [];
  const appointments = db.appointments || [];
  const vaccinations = db.vaccinations || [];
  const invoices = db.invoices || [];

  // --- Determine scope based on role ---
  // Admin sees everything. Owner sees only their own data.
  const isAdmin = auth?.role === "admin";

  // Try to find the current owner record by email.
  const me =
    !isAdmin && auth?.email
      ? owners.find((o) => (o.email || "").toLowerCase() === auth.email.toLowerCase())
      : null;

  // For owners, assume o.pets is an array of pet IDs they own.
  const myPetIdSet = new Set(me?.pets || []);

  // Helpers to filter by ownership when not admin.
  const limitPets = isAdmin ? pets : pets.filter((p) => myPetIdSet.has(p.id));
  const limitAppointments = isAdmin
    ? appointments
    : appointments.filter((a) => myPetIdSet.has(a.petId));
  const limitVaccinations = isAdmin
    ? vaccinations
    : vaccinations.filter((v) => myPetIdSet.has(v.petId));
  const limitInvoices = isAdmin
    ? invoices
    : invoices.filter((i) => myPetIdSet.has(i.petId)); // assumes invoices include petId

  const overdueVaccines = (limitVaccinations || []).filter(
    (v) => v.nextDue && new Date(v.nextDue) < new Date()
  );
  const unpaidBills = (limitInvoices || []).filter((i) => !i.paid);

  const cards = [
    {
      title: "Total Pets",
      value: limitPets.length,
      color: "bg-blue-100",
      icon: <FaDog className="text-blue-600 text-3xl" />,
    },
    {
      title: "Appointments",
      value: limitAppointments.length,
      color: "bg-indigo-100",
      icon: <FaClipboardList className="text-indigo-600 text-3xl" />,
    },
    {
      title: "Overdue Vaccines",
      value: overdueVaccines.length,
      color: "bg-pink-100",
      icon: <FaSyringe className="text-pink-600 text-3xl" />,
    },
    {
      title: "Unpaid Bills",
      value: unpaidBills.length,
      color: "bg-yellow-100",
      icon: <FaFileInvoiceDollar className="text-yellow-600 text-3xl" />,
    },
  ];

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Overview{auth?.name ? ` — Hi, ${auth.name}!` : ""}
        </h1>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
          {isAdmin ? "Admin view (all data)" : "Owner view (your data only)"}
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.title} className={`p-6 rounded-xl shadow-sm ${c.color} flex items-center gap-4`}>
            {c.icon}
            <div>
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <p className="text-3xl font-bold">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments (scoped) */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Pet</th>
              <th className="p-2">Doctor</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {limitAppointments.slice(0, 5).map((a) => {
              const pet = pets.find((p) => p.id === a.petId);
              return (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{pet?.name}</td>
                  <td className="p-2">{a.doctor}</td>
                  <td className="p-2">{a.date}</td>
                  <td className="p-2">{a.time}</td>
                  <td className="p-2">{a.reason}</td>
                </tr>
              );
            })}
            {limitAppointments.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-sm text-gray-500">
                  No appointments to show.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pet Owners table — visible to Admin only */}
      {isAdmin && (
        <div className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Pet Owners</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Location</th>
                <th className="p-2">Pets Count</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((o) => (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{o.name}</td>
                  <td className="p-2">{o.email}</td>
                  <td className="p-2">{o.location}</td>
                  <td className="p-2">{o.pets?.length || 0}</td>
                </tr>
              ))}
              {owners.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-3 text-sm text-gray-500">
                    No owners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
