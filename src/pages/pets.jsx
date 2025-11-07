import { loadDB } from "../store/db";
import { useAuth } from "../auth/guards";
import { useMemo } from "react";

export default function Pets() {
  const auth = useAuth();
  const db = loadDB() || {};
  const pets = db.pets || [];
  const owners = db.owners || [];
  const isAdmin = auth?.role === "admin";

  const me = useMemo(() => {
    if (!auth?.email) return null;
    const email = auth.email.toLowerCase();
    return owners.find(o => (o.email || "").toLowerCase() === email) || null;
  }, [owners, auth?.email]);

  const myPetIds = new Set(me?.pets || []);

  const filteredPets = useMemo(() => {
    if (isAdmin) return pets;
    const email = (auth?.email || "").toLowerCase();
    const ownerId = me?.id;
    const ownerName = me?.name || "";
    return pets.filter(p => {
      const byId = myPetIds.size > 0 && myPetIds.has(p.id);
      const byOwnerId = ownerId && p.ownerId === ownerId;
      const byEmail = (p.ownerEmail || "").toLowerCase() === email;
      const byName = ownerName && (p.owner === ownerName || p.ownerName === ownerName);
      return byId || byOwnerId || byEmail || byName;
    });
  }, [isAdmin, pets, myPetIds, me, auth?.email]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{isAdmin ? "Pets Directory" : "My Pets"}</h1>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-indigo-50 border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Species</th>
              <th className="p-2 text-left">Breed</th>
              {isAdmin && <th className="p-2 text-left">Owner</th>}
              {isAdmin && <th className="p-2 text-left">Owner Email</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPets.length === 0 ? (
              <tr><td colSpan={isAdmin ? 5 : 3} className="p-3 text-sm text-gray-500">{isAdmin ? "No pets." : "No pets yet."}</td></tr>
            ) : (
              filteredPets.map(p => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.species}</td>
                  <td className="p-2">{p.breed}</td>
                  {isAdmin && <td className="p-2">{p.ownerName || p.owner || ""}</td>}
                  {isAdmin && <td className="p-2">{p.ownerEmail || ""}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
