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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-6">
      <div className="max-w-4xl mx-auto animate-fadeIn">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-green-700 mb-6 tracking-tight">
          Vaccination Records
        </h2>

        {/* Empty State */}
        {ownerVaccinations.length === 0 ? (
          <p className="text-slate-600 text-lg bg-white border border-green-100 shadow-sm rounded-2xl p-6">
            No vaccination records found for your pets yet.
          </p>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-green-50 text-green-900 font-semibold border-b border-green-100">
                  <th className="px-4 py-3 text-left">Pet</th>
                  <th className="px-4 py-3 text-left">Vaccine</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Next Due</th>
                  <th className="px-4 py-3 text-left">Doctor</th>
                </tr>
              </thead>

              <tbody>
                {ownerVaccinations.map((v) => {
                  const pet = findPet(v.petId);
                  const doc = findDoctor(v.doctorId);
                  const overdue =
                    v.nextDue && new Date(v.nextDue) < new Date();

                  return (
                    <tr
                      key={v._id || v.id}
                      className="border-b last:border-0 hover:bg-green-50/40 transition"
                    >
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {pet?.name || "Unknown"}
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {v.vaccine}
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {v.date
                          ? new Date(v.date).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={
                            overdue
                              ? "text-red-600 font-semibold"
                              : "text-green-700 font-medium"
                          }
                        >
                          {v.nextDue
                            ? new Date(v.nextDue).toLocaleDateString()
                            : "-"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-700">
                        {doc?.name || "-"}
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
