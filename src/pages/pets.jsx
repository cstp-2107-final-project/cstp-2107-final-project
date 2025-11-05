import { loadDB, saveDB } from "../store/db";
import { useState } from "react";

export default function Pets() {
  const [db, setDb] = useState(loadDB());
  const [newPet, setNewPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    owner: "",
    contact: "",
  });

  const handleAddPet = (e) => {
    e.preventDefault();
    const updated = {
      ...db,
      pets: [
        ...db.pets,
        {
          id: crypto.randomUUID(),
          ...newPet,
          age: parseInt(newPet.age) || 0,
        },
      ],
    };
    saveDB(updated);
    setDb(updated);
    setNewPet({ name: "", species: "", breed: "", age: "", owner: "", contact: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">Pets Directory</h1>

      <form onSubmit={handleAddPet} className="mb-6 grid grid-cols-3 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Species"
          value={newPet.species}
          onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Breed"
          value={newPet.breed}
          onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Age"
          value={newPet.age}
          onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Owner"
          value={newPet.owner}
          onChange={(e) => setNewPet({ ...newPet, owner: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Contact"
          value={newPet.contact}
          onChange={(e) => setNewPet({ ...newPet, contact: e.target.value })}
        />
        <button
          type="submit"
          className="col-span-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Pet
        </button>
      </form>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-purple-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Species</th>
            <th className="p-2">Breed</th>
            <th className="p-2">Age</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Contact</th>
          </tr>
        </thead>
        <tbody>
          {db.pets.map((p) => (
            <tr key={p.id} className="border-b hover:bg-purple-50">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.species}</td>
              <td className="p-2">{p.breed}</td>
              <td className="p-2">{p.age}</td>
              <td className="p-2">{p.owner}</td>
              <td className="p-2">{p.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
