import { loadDB } from "../store/db";
import { useAuth } from "../auth/guards";
import { FaDog, FaClipboardList, FaSyringe, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";

export default function AdminData() {
  const auth = useAuth();
  const db = loadDB() || {};
  const pets = db.pets || [];
  const owners = db.owners || [];
  const appointments = db.appointments || [];
  const vaccinations = db.vaccinations || [];
  const invoices = db.invoices || [];

  const overdueVaccines = vaccinations.filter((v) => v.nextDue && new Date(v.nextDue) < new Date());
  const unpaidBills = invoices.filter((i) => !i.paid);

  const cards = [
    { title: "Total Pets", value: pets.length, icon: <FaDog />, bg: "bg-blue-100", fg: "text-blue-700" },
    { title: "Appointments", value: appointments.length, icon: <FaClipboardList />, bg: "bg-indigo-100", fg: "text-indigo-700" },
    { title: "Overdue Vaccines", value: overdueVaccines.length, icon: <FaSyringe />, bg: "bg-pink-100", fg: "text-pink-700" },
    { title: "Unpaid Bills", value: unpaidBills.length, icon: <FaFileInvoiceDollar />, bg: "bg-yellow-100", fg: "text-yellow-700" },
    { title: "Owners", value: owners.length, icon: <FaUsers />, bg: "bg-teal-100", fg: "text-teal-700" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Admin</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.title} className={`rounded-xl shadow-sm p-4 flex items-center gap-3 ${c.bg}`}>
            <div className={`text-2xl ${c.fg}`}>{c.icon}</div>
            <div>
              <div className="text-sm text-gray-600">{c.title}</div>
              <div className="text-2xl font-bold">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <Section title="Pets">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-50 border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Species</th>
              <th className="p-2 text-left">Breed</th>
              <th className="p-2 text-left">Owner</th>
              <th className="p-2 text-left">Owner Email</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.species}</td>
                <td className="p-2">{p.breed}</td>
                <td className="p-2">{p.ownerName || p.owner || ""}</td>
                <td className="p-2">{p.ownerEmail || ""}</td>
              </tr>
            ))}
            {pets.length === 0 && <tr><td colSpan={5} className="p-3 text-sm text-gray-500">No pets.</td></tr>}
          </tbody>
        </table>
      </Section>

      <Section title="Owners">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-50 border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Pets Count</th>
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
            {owners.length === 0 && <tr><td colSpan={4} className="p-3 text-sm text-gray-500">No owners.</td></tr>}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-10">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
