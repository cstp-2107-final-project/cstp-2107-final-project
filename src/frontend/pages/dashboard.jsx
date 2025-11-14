import { loadDB } from "../store/db";
import { useAuth } from "../auth/guards";
import { FaDog, FaClipboardList, FaSyringe, FaFileInvoiceDollar } from "react-icons/fa";

export default function Dashboard() {
  const auth = useAuth();
  const db = loadDB() || {};
  const pets = db.pets || [];
  const owners = db.owners || [];
  const appointments = db.appointments || [];
  const vaccinations = db.vaccinations || [];
  const invoices = db.invoices || [];

  const isAdmin = auth?.role === "admin";

  const me =
    !isAdmin && auth?.email
      ? owners.find((o) => (o.email || "").toLowerCase() === auth.email.toLowerCase())
      : null;

  const myPetIdSet = new Set(me?.pets || []);

  const limitPets = isAdmin ? pets : pets.filter((p) => myPetIdSet.has(p.id));
  const limitAppointments = isAdmin
    ? appointments
    : appointments.filter((a) => myPetIdSet.has(a.petId));
  const limitVaccinations = isAdmin
    ? vaccinations
    : vaccinations.filter((v) => myPetIdSet.has(v.petId));
  const limitInvoices = isAdmin
    ? invoices
    : invoices.filter((i) => myPetIdSet.has(i.petId));

  const overdueVaccines = limitVaccinations.filter(
    (v) => v.nextDue && new Date(v.nextDue) < new Date()
  );
  const unpaidBills = limitInvoices.filter((i) => !i.paid);

  // ✔ Updated unified clinic-green card styles
  const cards = [
    {
      title: "Total Pets",
      value: limitPets.length,
      color: "bg-green-50 border border-green-200",
      icon: <FaDog className="text-green-600 text-3xl" />,
    },
    {
      title: "Appointments",
      value: limitAppointments.length,
      color: "bg-green-50 border border-green-200",
      icon: <FaClipboardList className="text-green-600 text-3xl" />,
    },
    {
      title: "Overdue Vaccines",
      value: overdueVaccines.length,
      color: "bg-red-50 border border-red-200",
      icon: <FaSyringe className="text-red-500 text-3xl" />,
    },
    {
      title: "Unpaid Bills",
      value: unpaidBills.length,
      color: "bg-yellow-50 border border-yellow-200",
      icon: <FaFileInvoiceDollar className="text-yellow-600 text-3xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6 animate-fadeIn">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-baseline justify-between">
          <h1 className="text-4xl font-extrabold text-green-700">
            Dashboard {auth?.name ? `— Hi, ${auth.name}!` : ""}
          </h1>

          <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium border border-green-200">
            {isAdmin ? "Admin View" : "Owner View"}
          </span>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`p-6 rounded-2xl shadow-sm flex items-center gap-4 ${c.color}`}
            >
              {c.icon}
              <div>
                <h2 className="text-sm font-semibold text-gray-700">{c.title}</h2>
                <p className="text-3xl font-bold text-gray-900">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* UPCOMING APPOINTMENTS */}
        <div className="bg-white border border-green-100 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Upcoming Appointments</h2>

          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-green-50 text-green-900 font-semibold">
                <th className="p-3">Pet</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Reason</th>
              </tr>
            </thead>

            <tbody>
              {limitAppointments.slice(0, 5).map((a) => {
                const pet = pets.find((p) => p.id === a.petId);
                return (
                  <tr key={a.id} className="border-b hover:bg-green-50/40 transition">
                    <td className="p-3">{pet?.name}</td>
                    <td className="p-3">{a.doctor}</td>
                    <td className="p-3">{a.date}</td>
                    <td className="p-3">{a.time}</td>
                    <td className="p-3">{a.reason}</td>
                  </tr>
                );
              })}

              {limitAppointments.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-gray-500 text-sm">
                    No appointments to show.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ADMIN: PET OWNERS TABLE */}
        {isAdmin && (
          <div className="bg-white border border-green-100 rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Pet Owners</h2>

            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-green-50 border-b text-green-900 font-semibold">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Pets</th>
                </tr>
              </thead>

              <tbody>
                {owners.map((o) => (
                  <tr key={o.id} className="border-b hover:bg-green-50/40 transition">
                    <td className="p-3">{o.name}</td>
                    <td className="p-3">{o.email}</td>
                    <td className="p-3">{o.location}</td>
                    <td className="p-3">{o.pets?.length || 0}</td>
                  </tr>
                ))}

                {owners.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-gray-500 text-sm">
                      No owners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
