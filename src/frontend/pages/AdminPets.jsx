// src/frontend/pages/AdminPets.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function AdminPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/pets`);
        const data = await res.json();
        setPets(data);
      } catch (err) {
        console.error("Error loading pets:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div className="space-y-6">
      <header className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            All Pets (Admin)
          </h1>
          <p className="text-xs text-slate-500">
            View all pets registered by owners in the clinic system.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          Total pets:{" "}
          <span className="font-semibold text-slate-800">{pets.length}</span>
        </div>
      </header>

      <section className="bg-white rounded-2xl shadow p-6">
        {loading ? (
          <p className="text-xs text-slate-500">Loading pets…</p>
        ) : pets.length === 0 ? (
          <p className="text-xs text-slate-500">
            No pets have been registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left">
                  <th className="px-3 py-2">Pet</th>
                  <th className="px-3 py-2">Species</th>
                  <th className="px-3 py-2">Breed</th>
                  <th className="px-3 py-2">Age</th>
                  <th className="px-3 py-2">Owner</th>
                  <th className="px-3 py-2">Owner Email</th>
                </tr>
              </thead>
              <tbody>
                {pets.map((pet) => (
                  <tr key={pet._id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-medium">{pet.name}</td>
                    <td className="px-3 py-2">{pet.species}</td>
                    <td className="px-3 py-2">{pet.breed || "—"}</td>
                    <td className="px-3 py-2">
                      {pet.age != null ? pet.age : "—"}
                    </td>
                    <td className="px-3 py-2">
                      {pet.ownerId?.name || "Unknown"}
                    </td>
                    <td className="px-3 py-2 text-slate-600">
                      {pet.ownerId?.email || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
