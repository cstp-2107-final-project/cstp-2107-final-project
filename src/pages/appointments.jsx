import { loadDB, saveDB } from "../store/db";
import { useState } from "react";

export default function Appointments() {
  const [db, setDb] = useState(loadDB());
  const [form, setForm] = useState({
    petId: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  const addAppointment = (e) => {
    e.preventDefault();
    const updated = {
      ...db,
      appointments: [
        ...db.appointments,
        { id: crypto.randomUUID(), ...form, status: "Scheduled" },
      ],
    };
    saveDB(updated);
    setDb(updated);
    setForm({ petId: "", doctor: "", date: "", time: "", reason: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Appointments</h1>

      <form onSubmit={addAppointment} className="grid grid-cols-3 gap-4 mb-6">
        <select
          required
          className="border p-2 rounded"
          value={form.petId}
          onChange={(e) => setForm({ ...form, petId: e.target.value })}
        >
          <option value="">Select Pet</option>
          {db.pets.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input
          className="border p-2 rounded"
          placeholder="Doctor"
          value={form.doctor}
          onChange={(e) => setForm({ ...form, doctor: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
        />
        <button
          type="submit"
          className="col-span-3 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Appointment
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-indigo-200">
          <tr>
            <th className="p-2">Pet</th>
            <th className="p-2">Doctor</th>
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Reason</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {db.appointments.map((a) => {
            const pet = db.pets.find((p) => p.id === a.petId);
            return (
              <tr key={a.id} className="border-b hover:bg-indigo-50">
                <td className="p-2">{pet?.name}</td>
                <td className="p-2">{a.doctor}</td>
                <td className="p-2">{a.date}</td>
                <td className="p-2">{a.time}</td>
                <td className="p-2">{a.reason}</td>
                <td className="p-2">{a.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
