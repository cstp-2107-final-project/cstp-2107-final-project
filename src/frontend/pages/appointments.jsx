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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6 animate-fadeIn">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-green-700 mb-4">
          Your Appointments
        </h2>

        {/* Empty */}
        {ownerAppointments.length === 0 ? (
          <p className="text-gray-600 text-sm bg-white border border-green-100 shadow-sm rounded-2xl p-6">
            You don&apos;t have any appointments scheduled right now.
          </p>
        ) : (
          /* Table Card */
          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-50 border-b border-green-100 text-green-900 font-semibold">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Pet</th>
                  <th className="px-4 py-3 text-left">Doctor</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {ownerAppointments.map((a) => {
                  const pet = findPet(a.petId);
                  const doc = findDoctor(a.doctorId);

                  return (
                    <tr
                      key={a._id || a.id}
                      className="border-b last:border-0 hover:bg-green-50/40 transition"
                    >
                      <td className="px-4 py-3">{a.date}</td>
                      <td className="px-4 py-3">{a.time}</td>
                      <td className="px-4 py-3">{pet?.name || "Unknown"}</td>
                      <td className="px-4 py-3">{doc?.name || "-"}</td>
                      <td className="px-4 py-3">{a.reason}</td>

                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-3 py-1 rounded-full border ${
                            a.status === "Completed"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : a.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
