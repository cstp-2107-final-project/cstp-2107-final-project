// // src/pages/OwnerDashboard.jsx
// import { useMemo, useState } from "react";
// import { loadDB } from "../store/db";
// import { useAuth } from "../auth/guards";
// import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaPaw } from "react-icons/fa";


// const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
// const SPECIES = ["Dog", "Cat", "Bird", "Rabbit", "Reptile", "Other"];

// function saveDB(db) { localStorage.setItem("db", JSON.stringify(db)); }

// export default function OwnerDashboard() {
//   const auth = useAuth();
//   const [db, setDb] = useState(() => {
//     const d = loadDB() || {};
//     return { pets: d.pets || [], owners: d.owners || [], appointments: d.appointments || [], vaccinations: d.vaccinations || [], invoices: d.invoices || [] };
//   });

//   // find (or create) owner record
//   const owner = useMemo(() => {
//     if (!auth?.email) return null;
//     const email = auth.email.toLowerCase();
//     return db.owners.find((o) => (o.email || "").toLowerCase() === email) || null;
//   }, [db.owners, auth?.email]);

//   const myOwner = owner || (auth?.email ? {
//     id: uid(), name: auth.name || auth.email, email: auth.email, location: "", pets: []
//   } : null);

//   if (auth?.email && !owner) {
//     const nextDb = { ...db, owners: [...db.owners, myOwner] };
//     setDb(nextDb);
//     saveDB(nextDb);
//   }

//   const myPetIds = new Set(myOwner?.pets || []);
//   const myPets = (db.pets || []).filter((p) => myPetIds.has(p.id));

//   // add-row + edit state
//   const [newPet, setNewPet] = useState({ name: "", species: "Dog", breed: "", sex: "Unknown", ageYears: "", weightKg: "", notes: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [editRow, setEditRow] = useState(null);
//   const [flash, setFlash] = useState(null);

//   function addPet() {
//     if (!auth?.email || !myOwner) return;
//     const pet = {
//       id: uid(),
//       name: newPet.name.trim() || "Unnamed",
//       species: newPet.species || "Other",
//       breed: newPet.breed.trim(),
//       sex: newPet.sex || "Unknown",
//       ageYears: newPet.ageYears ? Number(newPet.ageYears) : "",
//       weightKg: newPet.weightKg ? Number(newPet.weightKg) : "",
//       notes: newPet.notes.trim(),
//       ownerId: myOwner.id, ownerName: myOwner.name, ownerEmail: myOwner.email,
//     };
//     const nextDb = {
//       ...db,
//       pets: [...db.pets, pet],
//       owners: db.owners.map((o) => o.id === myOwner.id ? { ...o, pets: [...(o.pets || []), pet.id] } : o),
//     };
//     setDb(nextDb); saveDB(nextDb);
//     setNewPet({ name: "", species: "Dog", breed: "", sex: "Unknown", ageYears: "", weightKg: "", notes: "" });
//     setFlash({ type: "ok", text: "Pet added." });
//   }

//   function startEdit(p) {
//     setEditingId(p.id);
//     setEditRow({ name: p.name || "", species: p.species || "Dog", breed: p.breed || "", sex: p.sex || "Unknown", ageYears: p.ageYears ?? "", weightKg: p.weightKg ?? "", notes: p.notes || "" });
//   }
//   function saveEdit(id) {
//     const nextDb = { ...db, pets: db.pets.map((p) => (p.id === id ? { ...p, ...editRow } : p)) };
//     setDb(nextDb); saveDB(nextDb); setEditingId(null); setEditRow(null); setFlash({ type: "ok", text: "Pet updated." });
//   }
//   function cancelEdit() { setEditingId(null); setEditRow(null); }
//   function removePet(p) {
//     if (!confirm(`Delete ${p.name}?`)) return;
//     const nextDb = {
//       ...db,
//       pets: db.pets.filter((x) => x.id !== p.id),
//       owners: db.owners.map((o) => o.id === p.ownerId ? { ...o, pets: (o.pets || []).filter((pid) => pid !== p.id) } : o),
//       appointments: db.appointments.filter((a) => a.petId !== p.id),
//       vaccinations: db.vaccinations.filter((v) => v.petId !== p.id),
//       invoices: db.invoices.filter((i) => i.petId !== p.id),
//     };
//     setDb(nextDb); saveDB(nextDb); setFlash({ type: "ok", text: "Pet deleted." });
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
//         <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Owner</span>
//       </div>

//       {flash && (
//         <div className={`mb-4 rounded-lg px-4 py-3 text-sm border ${flash.type === "ok" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
//           {flash.text}
//         </div>
//       )}

//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-indigo-50 border-b">
//               <th className="p-2 text-left">Name</th>
//               <th className="p-2 text-left">Species</th>
//               <th className="p-2 text-left">Breed</th>
//               <th className="p-2 text-left">Sex</th>
//               <th className="p-2 text-left">Age (yrs)</th>
//               <th className="p-2 text-left">Weight (kg)</th>
//               <th className="p-2 text-left">Notes</th>
//               <th className="p-2 text-left w-40">Actions</th>
//             </tr>

//             {/* Add Pet row */}
//             <tr className="border-b">
//               <td className="p-2"><input className="w-full border rounded px-2 py-1" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} placeholder="Pet name" /></td>
//               <td className="p-2">
//                 <select className="w-full border rounded px-2 py-1" value={newPet.species} onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}>
//                   {SPECIES.map((s) => <option key={s} value={s}>{s}</option>)}
//                 </select>
//               </td>
//               <td className="p-2"><input className="w-full border rounded px-2 py-1" value={newPet.breed} onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })} placeholder="Breed" /></td>
//               <td className="p-2">
//                 <select className="w-full border rounded px-2 py-1" value={newPet.sex} onChange={(e) => setNewPet({ ...newPet, sex: e.target.value })}>
//                   <option>Male</option><option>Female</option><option>Unknown</option>
//                 </select>
//               </td>
//               <td className="p-2"><input type="number" min="0" step="0.1" className="w-full border rounded px-2 py-1" value={newPet.ageYears} onChange={(e) => setNewPet({ ...newPet, ageYears: e.target.value })} placeholder="Age" /></td>
//               <td className="p-2"><input type="number" min="0" step="0.1" className="w-full border rounded px-2 py-1" value={newPet.weightKg} onChange={(e) => setNewPet({ ...newPet, weightKg: e.target.value })} placeholder="Weight" /></td>
//               <td className="p-2"><input className="w-full border rounded px-2 py-1" value={newPet.notes} onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })} placeholder="Notes" /></td>
//               <td className="p-2">
//                 <button onClick={addPet} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700"><FaPlus /> Add Pet</button>
//               </td>
//             </tr>
//           </thead>

//           <tbody>
//             {myPets.length === 0 ? (
//               <tr><td colSpan={8} className="p-3 text-sm text-gray-500">No pets yet — add one above.</td></tr>
//             ) : (
//               myPets.map((p) => (
//                 editingId === p.id ? (
//                   <tr key={p.id} className="border-b">
//                     <CellEdit value={editRow.name} onChange={(v) => setEditRow({ ...editRow, name: v })} />
//                     <CellSelect value={editRow.species} onChange={(v) => setEditRow({ ...editRow, species: v })} options={SPECIES} />
//                     <CellEdit value={editRow.breed} onChange={(v) => setEditRow({ ...editRow, breed: v })} />
//                     <CellSelect value={editRow.sex} onChange={(v) => setEditRow({ ...editRow, sex: v })} options={["Male", "Female", "Unknown"]} />
//                     <CellEdit type="number" value={editRow.ageYears} onChange={(v) => setEditRow({ ...editRow, ageYears: v })} />
//                     <CellEdit type="number" value={editRow.weightKg} onChange={(v) => setEditRow({ ...editRow, weightKg: v })} />
//                     <CellEdit value={editRow.notes} onChange={(v) => setEditRow({ ...editRow, notes: v })} />
//                     <td className="p-2">
//                       <div className="flex gap-2">
//                         <button onClick={() => saveEdit(p.id)} className="inline-flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"><FaSave /> Save</button>
//                         <button onClick={cancelEdit} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-200"><FaTimes /> Cancel</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   <tr key={p.id} className="border-b hover:bg-gray-50">
//                     <td className="p-2">{p.name}</td>
//                     <td className="p-2">{p.species}</td>
//                     <td className="p-2">{p.breed}</td>
//                     <td className="p-2">{p.sex}</td>
//                     <td className="p-2">{p.ageYears !== "" ? p.ageYears : ""}</td>
//                     <td className="p-2">{p.weightKg !== "" ? p.weightKg : ""}</td>
//                     <td className="p-2">{p.notes}</td>
//                     <td className="p-2">
//                       <div className="flex gap-2">
//                         <button onClick={() => startEdit(p)} className="inline-flex items-center gap-1 text-indigo-600 hover:underline"><FaEdit /> Edit</button>
//                         <button onClick={() => removePet(p)} className="inline-flex items-center gap-1 text-red-600 hover:underline"><FaTrash /> Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function CellEdit({ value, onChange, type = "text" }) {
//   return <td className="p-2"><input type={type} className="w-full border rounded px-2 py-1" value={value} onChange={(e) => onChange(e.target.value)} /></td>;
// }
// function CellSelect({ value, onChange, options }) {
//   return (
//     <td className="p-2">
//       <select className="w-full border rounded px-2 py-1" value={value} onChange={(e) => onChange(e.target.value)}>
//         {options.map((o) => <option key={o} value={o}>{o}</option>)}
//       </select>
//     </td>
//   );
// }
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/guards.jsx";

const API_BASE = "http://localhost:5001/api";

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function loadAll() {
      try {
        const [ownersRes, petsRes, vaccRes, apptRes, invRes] = await Promise.all(
          [
            fetch(`${API_BASE}/owners`),
            fetch(`${API_BASE}/pets`),
            fetch(`${API_BASE}/vaccinations`),
            fetch(`${API_BASE}/appointments`),
            fetch(`${API_BASE}/invoices`),
          ]
        );

        setOwners(await ownersRes.json());
        setPets(await petsRes.json());
        setVaccinations(await vaccRes.json());
        setAppointments(await apptRes.json());
        setInvoices(await invRes.json());
      } catch (err) {
        console.error("Error loading owner dashboard:", err);
      }
    }
    loadAll();
  }, []);

  const owner =
    owners.find((o) => o.email === user?.email) || owners[0] || null;

  const ownerPets = owner
    ? pets.filter((p) => p.ownerId === owner._id || p.ownerId === owner.id)
    : [];

  const petIds = new Set(ownerPets.map((p) => p._id || p.id));

  const ownerVaccinations = vaccinations.filter((v) =>
    petIds.has(v.petId?._id || v.petId || v.pet)
  );
  const ownerAppointments = appointments.filter((a) =>
    petIds.has(a.petId?._id || a.petId)
  );
  const ownerInvoices = invoices.filter((i) =>
    petIds.has(i.petId?._id || i.petId)
  );

  const unpaidCount = ownerInvoices.filter((i) => !i.paid).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">

        {/* Welcome card */}
        <section className="bg-white rounded-2xl shadow-md border border-green-100 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h2 className="text-3xl font-extrabold text-green-700">
              Welcome, {owner?.name || user?.name || user?.email || "Owner"}
            </h2>

            {owner && (
              <p className="text-gray-600 text-sm mt-2">
                {owner.email} • {owner.phone || "No phone on file"}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
            <OwnerStat label="Pets" value={ownerPets.length} />
            <OwnerStat label="Appointments" value={ownerAppointments.length} />
            <OwnerStat label="Unpaid Bills" value={unpaidCount} />
          </div>
        </section>
      </div>
    </div>
  );
}

function OwnerStat({ label, value }) {
  return (
    <div className="bg-green-50 text-green-700 rounded-2xl px-6 py-4 shadow-sm border border-green-100 text-center">
      <div className="text-xs uppercase tracking-wide text-green-800 font-medium">
        {label}
      </div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
