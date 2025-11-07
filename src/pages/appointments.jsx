// src/pages/appointments.jsx
import { loadDB } from "../store/db";
import { useAuth } from "../auth/guards";
import { useMemo, useState } from "react";

export default function Appointments() {
  const auth = useAuth();
  const db = loadDB() || {};
  const pets = db.pets || [];
  const owners = db.owners || [];
  const appointments = db.appointments || [];
  const isAdmin = auth?.role === "admin";

  const me = useMemo(() => {
    if (!auth?.email) return null;
    const email = auth.email.toLowerCase();
    return owners.find((o) => (o.email || "").toLowerCase() === email) || null;
  }, [owners, auth?.email]);

  const myPetIds = new Set(me?.pets || []);

  const visiblePets = useMemo(() => {
    if (isAdmin) return pets;
    const email = (auth?.email || "").toLowerCase();
    return pets.filter((p) => {
      const byId = myPetIds.size > 0 && myPetIds.has(p.id);
      const byOwnerId = me?.id && p.ownerId === me.id;
      const byEmail = p.ownerEmail && p.ownerEmail.toLowerCase() === email;
      const byName = me?.name && (p.owner === me.name || p.ownerName === me.name);
      return byId || byOwnerId || byEmail || byName;
    });
  }, [isAdmin, pets, myPetIds, me, auth?.email]);

  const petById = useMemo(() => {
    const m = new Map(); pets.forEach((p) => m.set(p.id, p)); return m;
  }, [pets]);

  const visibleAppointments = useMemo(() => {
    if (isAdmin) return appointments;
    const visibleIds = new Set(visiblePets.map((p) => p.id));
    return appointments.filter((a) => visibleIds.has(a.petId));
  }, [isAdmin, appointments, visiblePets]);

  // If you have an Add form, keep it — just ensure pet dropdown uses visiblePets.
  const [petId, setPetId] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select value={petId} onChange={(e) => setPetId(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="">Select Pet</option>
          {visiblePets.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {/* keep your other inputs (doctor, date, time, reason, etc.) */}
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-indigo-50">
              <th className="p-2">Pet</th>
              <th className="p-2">Doctor</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleAppointments.length === 0 ? (
              <tr><td colSpan={6} className="p-3 text-sm text-gray-500">No appointments to show.</td></tr>
            ) : (
              visibleAppointments.map((a) => {
                const pet = petById.get(a.petId);
                return (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{pet?.name || "-"}</td>
                    <td className="p-2">{a.doctor}</td>
                    <td className="p-2">{a.date}</td>
                    <td className="p-2">{a.time}</td>
                    <td className="p-2">{a.reason}</td>
                    <td className="p-2">{a.status || "Scheduled"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
