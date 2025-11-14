// src/frontend/pages/AdminData.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5001/api";

export default function AdminData() {
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        const [
          ownersRes,
          petsRes,
          doctorsRes,
          vaccRes,
          apptRes,
          invRes,
        ] = await Promise.all([
          fetch(`${API_BASE}/owners`),
          fetch(`${API_BASE}/pets`),
          fetch(`${API_BASE}/doctors`),
          fetch(`${API_BASE}/vaccinations`),
          fetch(`${API_BASE}/appointments`),
          fetch(`${API_BASE}/invoices`),
        ]);

        setOwners(await ownersRes.json());
        setPets(await petsRes.json());
        setDoctors(await doctorsRes.json());
        setVaccinations(await vaccRes.json());
        setAppointments(await apptRes.json());
        setInvoices(await invRes.json());
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-green-700 font-semibold animate-pulse">
        Loading clinic data…
      </div>
    );
  }

  const unpaidInvoices = invoices.filter((i) => !i.paid);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6 animate-fadeIn">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* STATS GRID */}
        <section className="grid md:grid-cols-4 gap-6">
          <StatCard label="Owners" value={owners.length} />
          <StatCard label="Pets" value={pets.length} />
          <StatCard label="Doctors" value={doctors.length} />
          <StatCard label="Unpaid Invoices" value={unpaidInvoices.length} />
        </section>

        {/* OWNERS + PETS SECTION */}
        <Section title="Registered Owners & Their Pets">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-50 border-b border-green-100 text-green-900 font-semibold">
                  <th className="px-4 py-3 text-left">Owner</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Pets</th>
                </tr>
              </thead>

              <tbody>
                {owners.map((owner) => {
                  const ownerPets = pets.filter(
                    (p) => p.ownerId === owner._id || p.ownerId === owner.id
                  );

                  return (
                    <tr
                      key={owner._id || owner.id}
                      className="border-b last:border-0 hover:bg-green-50/40 transition"
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {owner.name}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        <div>{owner.email}</div>
                        <div>{owner.phone || "—"}</div>
                      </td>

                      <td className="px-4 py-3">
                        {ownerPets.length === 0 ? (
                          <span className="text-gray-400">No pets yet</span>
                        ) : (
                          <ul className="list-disc list-inside text-gray-700">
                            {ownerPets.map((p) => (
                              <li key={p._id || p.id}>
                                {p.name} ({p.species}, {p.breed})
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-green-700 font-medium">
        {label}
      </div>
      <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-white rounded-2xl shadow-md border border-green-100 p-8 space-y-4">
      <h2 className="text-2xl font-extrabold text-green-700">{title}</h2>
      {children}
    </section>
  );
}
