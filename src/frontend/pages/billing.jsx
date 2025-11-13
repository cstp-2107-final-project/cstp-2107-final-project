// src/frontend/pages/billing.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5000/api";

export default function Billing() {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function load() {
      const [ownersRes, petsRes, invRes] = await Promise.all([
        fetch(`${API_BASE}/owners`),
        fetch(`${API_BASE}/pets`),
        fetch(`${API_BASE}/invoices`),
      ]);
      setOwners(await ownersRes.json());
      setPets(await petsRes.json());
      setInvoices(await invRes.json());
    }
    load();
  }, []);

  const owner =
    owners.find((o) => o.email === user?.email) || owners[0] || null;

  const ownerPets = owner
    ? pets.filter((p) => p.ownerId === owner._id || p.ownerId === owner.id)
    : [];
  const petIds = new Set(ownerPets.map((p) => p._id || p.id));

  const ownerInvoices = invoices.filter((i) =>
    petIds.has(i.petId?._id || i.petId)
  );

  const findPet = (id) =>
    pets.find((p) => p._id === id || p.id === id || p._id === id?._id);

  const totalDue = ownerInvoices
    .filter((i) => !i.paid)
    .reduce((sum, i) => sum + (i.amount || 0), 0);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Billing</h2>
        <div className="text-sm">
          <span className="text-slate-600 mr-2">Total outstanding:</span>
          <span className="text-emerald-700 font-bold">
            ${totalDue.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {ownerInvoices.length === 0 ? (
          <p className="text-slate-500 text-sm">
            No invoices found for your pets.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Pet</th>
                  <th className="px-3 py-2">Description</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {ownerInvoices.map((inv) => {
                  const pet = findPet(inv.petId);
                  return (
                    <tr key={inv._id || inv.id} className="border-b last:border-0">
                      <td className="px-3 py-2">{inv.date}</td>
                      <td className="px-3 py-2">{pet?.name || "Unknown"}</td>
                      <td className="px-3 py-2">{inv.description}</td>
                      <td className="px-3 py-2">
                        ${inv.amount?.toFixed(2) ?? "0.00"}
                      </td>
                      <td className="px-3 py-2">
                        {inv.paid ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                            Paid
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                            Due
                          </span>
                        )}
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
