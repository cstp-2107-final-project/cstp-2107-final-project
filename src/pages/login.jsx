import { loadDB, saveDB } from "../store/db";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [db, setDb] = useState(loadDB());
  const [form, setForm] = useState({ name: "", email: "", password: "", location: "" });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const exists = db.owners.find(o => o.email === form.email);
    if (exists) return alert("Account already exists!");

    const updated = {
      ...db,
      owners: [...db.owners, { id: crypto.randomUUID(), ...form, pets: [] }],
    };
    saveDB(updated);
    setDb(updated);
    alert("Profile created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Pet Owner Login / Signup</h1>
      <form onSubmit={handleRegister} className="bg-white shadow-lg p-8 rounded w-full max-w-md space-y-4">
        <input className="border p-2 rounded w-full" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
        <input className="border p-2 rounded w-full" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
        <input className="border p-2 rounded w-full" type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}/>
        <input className="border p-2 rounded w-full" placeholder="Location / Address" value={form.location} onChange={e => setForm({...form, location: e.target.value})}/>
        <button type="submit" className="bg-indigo-600 text-white w-full py-2 rounded hover:bg-indigo-700">Create Profile</button>
      </form>
    </div>
  );
}
