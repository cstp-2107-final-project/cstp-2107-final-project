import { loadDB, saveDB } from "../store/db";
import { useState } from "react";

export default function Vaccinations() {
  const [db, setDb] = useState(loadDB());
  const [form, setForm] = useState({
    petId: "",
    vaccine: "",
    date: "",
    nextDue: "",
  });

  const addVaccination = (e) => {
    e.preventDefault();
    const updated = {
      ...db,
      vaccinations: [
        ...(db.vaccinations || []),
        { id: crypto.randomUUID(), ...form },
      ],
    };
    saveDB(updated);
    setDb(updated);
    setForm({ petId: "", vaccine: "", date: "", nextDue: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-4">Vaccinations</h1>

      <form onSubmit={addVaccination} className="grid grid-cols-3 gap-4 mb-6">
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
          placeholder="Vaccine Name"
          value={form.vaccine}
          onChange={(e) => setForm({ ...form, vaccine: e.target.value })}
          required
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.nextDue}
          onChange={(e) => setForm({ ...form, nextDue: e.target.value })}
          placeholder="Next Due Date"
        />
        <button
          type="submit"
          className="col-span-3 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Add Vaccination
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-pink-200">
          <tr>
            <th className="p-2">Pet</th>
            <th className="p-2">Vaccine</th>
            <th className="p-2">Date</th>
            <th className="p-2">Next Due</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {(db.vaccinations || []).map((v) => {
            const pet = db.pets.find((p) => p.id === v.petId);
            const overdue =
              v.nextDue && new Date(v.nextDue) < new Date() ? true : false;
            return (
              <tr key={v.id} className="border-b hover:bg-pink-50">
                <td className="p-2">{pet?.name}</td>
                <td className="p-2">{v.vaccine}</td>
                <td className="p-2">{v.date}</td>
                <td className="p-2">{v.nextDue}</td>
                <td className="p-2">
                  {overdue ? (
                    <span className="text-red-600 font-semibold">Overdue</span>
                  ) : (
                    <span className="text-green-600 font-semibold">OK</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
