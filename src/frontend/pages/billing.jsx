import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5001/api";

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6 animate-fadeIn">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-md border border-green-100 p-8 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-green-700">Billing</h2>

          <div className="text-lg font-semibold">
            <span className="text-gray-600 mr-1">Outstanding:</span>
            <span className="text-green-700">${totalDue.toFixed(2)}</span>
          </div>
        </div>

        {/* INVOICES TABLE */}
        <div className="bg-white rounded-2xl shadow-md border border-green-100 p-8">
          {ownerInvoices.length === 0 ? (
            <p className="text-gray-600 text-sm">
              No invoices found for your pets.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-green-50 text-green-900 font-semibold border-b border-green-100">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Pet</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {ownerInvoices.map((inv) => {
                    const pet = findPet(inv.petId);

                    return (
                      <tr
                        key={inv._id || inv.id}
                        className="border-b hover:bg-green-50/40 transition"
                      >
                        <td className="px-4 py-3">{inv.date}</td>
                        <td className="px-4 py-3">{pet?.name || "Unknown"}</td>
                        <td className="px-4 py-3">{inv.description}</td>

                        <td className="px-4 py-3">
                          <span className="font-medium text-gray-800">
                            ${inv.amount?.toFixed(2) ?? "0.00"}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          {inv.paid ? (
                            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
                              Paid
                            </span>
                          ) : (
                            <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
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
    </div>
  );
}
