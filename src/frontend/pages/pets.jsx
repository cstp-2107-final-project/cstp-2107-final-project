// // src/frontend/pages/pets.jsx
// import { useEffect, useState } from "react";
// import { useAuth } from "../../auth/guards.jsx";

// const API_BASE = "http://localhost:5000/api";

// export default function Pets() {
//   const { user } = useAuth();
//   const [owners, setOwners] = useState([]);
//   const [pets, setPets] = useState([]);

//   useEffect(() => {
//     async function load() {
//       const [ownersRes, petsRes] = await Promise.all([
//         fetch(`${API_BASE}/owners`),
//         fetch(`${API_BASE}/pets`),
//       ]);
//       setOwners(await ownersRes.json());
//       setPets(await petsRes.json());
//     }
//     load();
//   }, []);

//   const owner =
//     owners.find((o) => o.email === user?.email) || owners[0] || null;

//   const ownerPets = owner
//     ? pets.filter((p) => p.ownerId === owner._id || p.ownerId === owner.id)
//     : [];

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4 text-slate-800">Your Pets</h2>
//       {ownerPets.length === 0 ? (
//         <p className="text-slate-500 text-sm">
//           No pets found for your account.
//         </p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-xl shadow">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="bg-slate-100 text-left">
//                 <th className="px-3 py-2">Name</th>
//                 <th className="px-3 py-2">Species</th>
//                 <th className="px-3 py-2">Breed</th>
//                 <th className="px-3 py-2">Age</th>
//               </tr>
//             </thead>
//             <tbody>
//               {ownerPets.map((p) => (
//                 <tr key={p._id || p.id} className="border-b last:border-0">
//                   <td className="px-3 py-2 font-medium">{p.name}</td>
//                   <td className="px-3 py-2">{p.species}</td>
//                   <td className="px-3 py-2">{p.breed}</td>
//                   <td className="px-3 py-2">{p.age}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// src/frontend/pages/pets.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5000/api";

export default function Pets() {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
  });

  useEffect(() => {
    if (!user?.email) return;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/pets/owner/${encodeURIComponent(user.email)}`);
        if (!res.ok) {
          throw new Error("Failed to load pets");
        }
        const data = await res.json();
        setPets(data);
      } catch (err) {
        console.error(err);
        setError("Could not load your pets. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      setError("You must be logged in as an owner to add pets.");
      return;
    }
    if (!form.name || !form.species) {
      setError("Pet name and species are required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ownerEmail: user.email,
          name: form.name,
          species: form.species,
          breed: form.breed || undefined,
          age: form.age ? Number(form.age) : undefined,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Failed to save pet");
      }

      const newPet = await res.json();
      setPets((prev) => [...prev, newPet]);
      setForm({ name: "", species: "", breed: "", age: "" });
    } catch (err) {
      console.error(err);
      setError(err.message || "Could not save pet.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">My Pets</h1>
          <p className="text-xs text-slate-500">
            Add and manage your pets. These records are visible to the clinic admin.
          </p>
        </div>
        <div className="text-xs text-slate-500">
          Logged in as <span className="font-medium">{user?.email}</span>
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        {/* Add Pet Form */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow p-5 space-y-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Add a new pet
          </h2>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <div>
              <label className="block text-slate-700 mb-1">Pet name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Buddy"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1">Species *</label>
              <input
                name="species"
                value={form.species}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Dog, Cat..."
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1">Breed</label>
              <input
                name="breed"
                value={form.breed}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="Labrador, Persian..."
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-1">Age (years)</label>
              <input
                type="number"
                min="0"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="3"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {saving ? "Saving..." : "Save Pet"}
            </button>
          </form>
        </div>

        {/* Pet List */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Your pets ({pets.length})
            </h2>
          </div>

          {loading ? (
            <p className="text-xs text-slate-500">Loading pets…</p>
          ) : pets.length === 0 ? (
            <p className="text-xs text-slate-500">
              You haven&apos;t added any pets yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  className="border border-slate-100 rounded-xl p-4 bg-slate-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {pet.name}
                    </h3>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 uppercase tracking-wide">
                      {pet.species}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Breed: {pet.breed || "—"}
                  </p>
                  <p className="text-xs text-slate-600">
                    Age: {pet.age != null ? `${pet.age} years` : "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
