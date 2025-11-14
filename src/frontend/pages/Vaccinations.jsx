// src/frontend/pages/Vaccinations.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5001/api";

export default function Vaccinations() {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    async function load() {
      const [ownersRes, petsRes, docsRes, vaccRes] = await Promise.all([
        fetch(`${API_BASE}/owners`),
        fetch(`${API_BASE}/pets`),
        fetch(`${API_BASE}/doctors`),
        fetch(`${API_BASE}/vaccinations`),
      ]);
      setOwners(await ownersRes.json());
      setPets(await petsRes.json());
      setDoctors(await docsRes.json());
      setVaccinations(await vaccRes.json());
    }
    load();
  }, []);

  const owner =
    owners.find((o) => o.email === user?.email) || owners[0] || null;

  const ownerPets = owner
    ? pets.filter((p) => p.ownerId === owner._id || p.ownerId === owner.id)
    : [];
  const petIds = new Set(ownerPets.map((p) => p._id || p.id));

  const ownerVaccinations = vaccinations.filter((v) =>
    petIds.has(v.petId?._id || v.petId)
  );

  const findPet = (id) =>
    pets.find((p) => p._id === id || p.id === id || p._id === id?._id);
  const findDoctor = (id) =>
    doctors.find((d) => d._id === id || d.id === id || d._id === id?._id);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Vaccination Records
      </h2>
      {ownerVaccinations.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No vaccination records for your pets yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2">Pet</th>
                <th className="px-3 py-2">Vaccine</th>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Next Due</th>
                <th className="px-3 py-2">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {ownerVaccinations.map((v) => {
                const pet = findPet(v.petId);
                const doc = findDoctor(v.doctorId);
                const overdue =
                  v.nextDue && new Date(v.nextDue) < new Date();
                return (
                  <tr key={v._id || v.id} className="border-b last:border-0">
                    <td className="px-3 py-2">{pet?.name || "Unknown"}</td>
                    <td className="px-3 py-2">{v.vaccine}</td>
                    <td className="px-3 py-2">
                      {v.date ? new Date(v.date).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          overdue
                            ? "text-red-600 font-medium"
                            : "text-slate-700"
                        }
                      >
                        {v.nextDue
                          ? new Date(v.nextDue).toLocaleDateString()
                          : "-"}
                      </span>
                    </td>
                    <td className="px-3 py-2">{doc?.name || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
