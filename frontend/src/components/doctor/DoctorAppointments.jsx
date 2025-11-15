import React, { useEffect, useState } from "react";
import { X, Edit2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API_BASE = "http://localhost:5001/api";

export default function DoctorAppointments() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    petId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
    status: "scheduled",
  });

  useEffect(() => {
    async function load() {
      const [apptRes, petRes, ownerRes, docRes] = await Promise.all([
        fetch(`${API_BASE}/appointments`),
        fetch(`${API_BASE}/pets`),
        fetch(`${API_BASE}/owners`),
        fetch(`${API_BASE}/doctors`),
      ]);

      const appts = await apptRes.json();
      const myAppts = appts.filter(
        (a) => a.doctorId === user.uid || a.doctorId?._id === user.uid
      );

      setAppointments(myAppts);
      setPets(await petRes.json());
      setOwners(await ownerRes.json());
      setDoctors(await docRes.json());
    }

    load();
  }, [user]);

  const openEdit = (apt) => {
    setEditing(apt);
    setForm({
      petId: apt.petId?._id || apt.petId,
      doctorId: apt.doctorId?._id || apt.doctorId,
      date: apt.date,
      time: apt.time,
      reason: apt.reason,
      status: apt.status,
    });
    setShowModal(true);
  };

  const save = async () => {
    const payload = {
      petId: form.petId,
      doctorId: form.doctorId,
      date: form.date,
      time: form.time,
      reason: form.reason,
      status: form.status,
    };

    await fetch(`${API_BASE}/appointments/${editing._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Refresh
    const res = await fetch(`${API_BASE}/appointments`);
    const all = await res.json();

    setAppointments(
      all.filter(
        (a) => a.doctorId === user.uid || a.doctorId?._id === user.uid
      )
    );

    setShowModal(false);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Your Appointments
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-600 bg-gray-100">
            <th className="px-4 py-3">Pet</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => {
            const pet = pets.find((p) => p._id === a.petId);
            return (
              <tr key={a._id} className="border-b">
                <td className="px-4 py-3">{pet?.name}</td>
                <td className="px-4 py-3">{a.date}</td>
                <td className="px-4 py-3">{a.time}</td>
                <td className="px-4 py-3">{a.reason}</td>
                <td className="px-4 py-3">{a.status}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => openEdit(a)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-xl">
            <button
              className="absolute right-4 top-4"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            <h3 className="text-xl font-bold mb-4">Edit Appointment</h3>

            <div className="space-y-4">
              {/* Pet */}
              <select
                className="w-full border p-2 rounded"
                value={form.petId}
                onChange={(e) => setForm({ ...form, petId: e.target.value })}
              >
                {pets.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* Doctor */}
              <select
                className="w-full border p-2 rounded"
                value={form.doctorId}
                onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
              >
                {doctors.map((d) => (
                  <option
                    key={d._id}
                    value={d._id}
                  >
                    {d.name}
                  </option>
                ))}
              </select>

              {/* Date */}
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              {/* Time */}
              <input
                type="time"
                className="w-full border p-2 rounded"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />

              {/* Reason */}
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={form.reason}
                placeholder="Reason"
                onChange={(e) =>
                  setForm({ ...form, reason: e.target.value })
                }
              />

              {/* Status */}
              <select
                className="w-full border p-2 rounded"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                onClick={save}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
