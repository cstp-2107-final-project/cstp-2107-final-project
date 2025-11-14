import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5001/api";

export default function Pets() {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function load() {
      const [ownersRes, petsRes] = await Promise.all([
        fetch(`${API_BASE}/owners`),
        fetch(`${API_BASE}/pets`),
      ]);
      setOwners(await ownersRes.json());
      setPets(await petsRes.json());
    }
    load();
  }, []);

  const owner =
    owners.find((o) => o.email === user?.email) || owners[0] || null;

  const ownerPets = owner
    ? pets.filter((p) => p.ownerId === owner._id || p.ownerId === owner.id)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto animate-fadeIn">

        {/* Title */}
        <h2 className="text-4xl font-extrabold text-green-700 mb-6 tracking-tight">
          Your Pets
        </h2>

        {/* Empty State */}
        {ownerPets.length === 0 ? (
          <p className="text-slate-600 text-lg bg-white border border-green-100 shadow-sm rounded-2xl p-6">
            No pets found for your account.
          </p>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-50 text-green-900 font-semibold border-b border-green-100">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Species</th>
                  <th className="px-4 py-3 text-left">Breed</th>
                  <th className="px-4 py-3 text-left">Age</th>
                </tr>
              </thead>

              <tbody>
                {ownerPets.map((p) => (
                  <tr
                    key={p._id || p.id}
                    className="border-b last:border-0 hover:bg-green-50/40 transition"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                    <td className="px-4 py-3 text-slate-700">{p.species}</td>
                    <td className="px-4 py-3 text-slate-700">{p.breed}</td>
                    <td className="px-4 py-3 text-slate-700">{p.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
