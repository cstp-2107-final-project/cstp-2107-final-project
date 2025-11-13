// src/frontend/pages/AdminData.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

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
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  if (loading) {
    return <div>Loading clinic data…</div>;
  }

  const unpaidInvoices = invoices.filter((i) => !i.paid);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <section className="grid md:grid-cols-4 gap-4">
        <StatCard label="Owners" value={owners.length} />
        <StatCard label="Pets" value={pets.length} />
        <StatCard label="Doctors" value={doctors.length} />
        <StatCard label="Unpaid Invoices" value={unpaidInvoices.length} />
      </section>

      {/* Owners + pets */}
      <Section title="Registered Owners & Their Pets">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2">Owner</th>
                <th className="px-3 py-2">Contact</th>
                <th className="px-3 py-2">Pets</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => {
                const ownerPets = pets.filter(
                  (p) => p.ownerId === owner._id || p.ownerId === owner.id
                );
                return (
                  <tr key={owner._id || owner.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">{owner.name}</td>
                    <td className="px-3 py-2 text-slate-600">
                      <div>{owner.email}</div>
                      <div>{owner.phone}</div>
                    </td>
                    <td className="px-3 py-2">
                      {ownerPets.length === 0 ? (
                        <span className="text-slate-400">No pets yet</span>
                      ) : (
                        <ul className="list-disc list-inside">
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
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {children}
    </section>
  );
}
