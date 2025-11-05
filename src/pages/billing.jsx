import { loadDB, saveDB } from "../store/db";
import { useState } from "react";

export default function Billing() {
  const [db, setDb] = useState(loadDB());
  const [form, setForm] = useState({
    petId: "",
    description: "",
    amount: "",
  });

  const addInvoice = (e) => {
    e.preventDefault();
    const newInvoice = {
      id: crypto.randomUUID(),
      petId: form.petId,
      description: form.description,
      amount: parseFloat(form.amount) || 0,
      date: new Date().toLocaleDateString(),
      paid: false,
    };
    const updated = {
      ...db,
      invoices: [...(db.invoices || []), newInvoice],
    };
    saveDB(updated);
    setDb(updated);
    setForm({ petId: "", description: "", amount: "" });
  };

  const togglePaid = (id) => {
    const updated = {
      ...db,
      invoices: db.invoices.map((inv) =>
        inv.id === id ? { ...inv, paid: !inv.paid } : inv
      ),
    };
    saveDB(updated);
    setDb(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-yellow-700 mb-4">Billing</h1>

      <form onSubmit={addInvoice} className="grid grid-cols-3 gap-4 mb-6">
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
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Amount ($)"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <button
          type="submit"
          className="col-span-3 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Add Invoice
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-yellow-200">
          <tr>
            <th className="p-2">Pet</th>
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {(db.invoices || []).map((inv) => {
            const pet = db.pets.find((p) => p.id === inv.petId);
            return (
              <tr key={inv.id} className="border-b hover:bg-yellow-50">
                <td className="p-2">{pet?.name}</td>
                <td className="p-2">{inv.description}</td>
                <td className="p-2">${inv.amount.toFixed(2)}</td>
                <td className="p-2">{inv.date}</td>
                <td className="p-2">
                  {inv.paid ? (
                    <span className="text-green-700 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-700 font-semibold">Pending</span>
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => togglePaid(inv.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
