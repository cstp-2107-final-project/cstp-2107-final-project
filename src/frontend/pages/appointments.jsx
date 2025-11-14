// src/frontend/pages/appointments.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5001/api";

export default function Appointments() {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function load() {
      const [ownersRes, petsRes, docsRes, apptRes] = await Promise.all([
        fetch(`${API_BASE}/owners`),
        fetch(`${API_BASE}/pets`),
        fetch(`${API_BASE}/doctors`),
        fetch(`${API_BASE}/appointments`),
      ]);
      setOwners(await ownersRes.json());
      setPets(await petsRes.json());
      setDoctors(await docsRes.json());
      setAppointments(await apptRes.json());
    }
    load();
  }, []);

  const owner =
    owners.find((o) => o.email === user?.email) || owners[0] || null;

  const ownerPets = owner
    ? pets.filter((p) => p.ownerId === owner._id || p.ownerId === owner.id)
    : [];
  const petIds = new Set(ownerPets.map((p) => p._id || p.id));

  const ownerAppointments = appointments.filter((a) =>
    petIds.has(a.petId?._id || a.petId)
  );

  const findPet = (id) =>
    pets.find((p) => p._id === id || p.id === id || p._id === id?._id);
  const findDoctor = (id) =>
    doctors.find((d) => d._id === id || d.id === id || d._id === id?._id);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Your Appointments
      </h2>
      {ownerAppointments.length === 0 ? (
        <p className="text-slate-500 text-sm">
          You don&apos;t have any appointments scheduled right now.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Pet</th>
                <th className="px-3 py-2">Doctor</th>
                <th className="px-3 py-2">Reason</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ownerAppointments.map((a) => {
                const pet = findPet(a.petId);
                const doc = findDoctor(a.doctorId);
                return (
                  <tr key={a._id || a.id} className="border-b last:border-0">
                    <td className="px-3 py-2">{a.date}</td>
                    <td className="px-3 py-2">{a.time}</td>
                    <td className="px-3 py-2">{pet?.name || "Unknown"}</td>
                    <td className="px-3 py-2">{doc?.name || "-"}</td>
                    <td className="px-3 py-2">{a.reason}</td>
                    <td className="px-3 py-2">{a.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
