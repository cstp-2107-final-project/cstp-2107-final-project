// src/frontend/pages/pets.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5000/api";

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
    <div>
      <h2 className="text-lg font-semibold mb-4 text-slate-800">Your Pets</h2>
      {ownerPets.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No pets found for your account.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Species</th>
                <th className="px-3 py-2">Breed</th>
                <th className="px-3 py-2">Age</th>
              </tr>
            </thead>
            <tbody>
              {ownerPets.map((p) => (
                <tr key={p._id || p.id} className="border-b last:border-0">
                  <td className="px-3 py-2 font-medium">{p.name}</td>
                  <td className="px-3 py-2">{p.species}</td>
                  <td className="px-3 py-2">{p.breed}</td>
                  <td className="px-3 py-2">{p.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
