import { loadDB } from "../store/db";
import { FaDog, FaClipboardList, FaSyringe, FaFileInvoiceDollar } from "react-icons/fa";

export default function Dashboard() {
  const db = loadDB();
  const overdueVaccines = (db.vaccinations || []).filter(
    (v) => v.nextDue && new Date(v.nextDue) < new Date()
  );
  const unpaidBills = (db.invoices || []).filter((i) => !i.paid);

  const cards = [
    { title: "Total Pets", value: db.pets.length, color: "bg-blue-100", icon: <FaDog className="text-blue-600 text-3xl" /> },
    { title: "Appointments", value: db.appointments.length, color: "bg-indigo-100", icon: <FaClipboardList className="text-indigo-600 text-3xl" /> },
    { title: "Overdue Vaccines", value: overdueVaccines.length, color: "bg-pink-100", icon: <FaSyringe className="text-pink-600 text-3xl" /> },
    { title: "Unpaid Bills", value: unpaidBills.length, color: "bg-yellow-100", icon: <FaFileInvoiceDollar className="text-yellow-600 text-3xl" /> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Overview</h1>
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
            {db.appointments.slice(0, 5).map((a) => {
              const pet = db.pets.find((p) => p.id === a.petId);
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
