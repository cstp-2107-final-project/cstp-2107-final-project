import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/guards.jsx";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    login({ role: "owner", name, email });
    navigate("/owner", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-green-100 p-8 animate-fadeIn">
        
        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-green-700 text-center mb-2">
          Create Owner Account
        </h1>

        <p className="text-gray-600 text-center text-sm mb-6">
          Access your pets, vaccinations, appointments, and bills.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Rita Singh"
              className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold 
                       hover:bg-green-700 transition shadow-sm"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}
