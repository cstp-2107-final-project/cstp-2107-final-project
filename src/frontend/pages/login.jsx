// src/frontend/pages/login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/guards.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (role === "admin") {
      if (email === "admin@clinic.com" && password === "admin123") {
        login({ role: "admin", email, name: "Clinic Admin" });
        navigate("/admin", { replace: true });
      } else {
        alert("Use admin@clinic.com / admin123 for admin login.");
      }
    } else {
      const nameFromEmail = email.split("@")[0];
      login({ role: "owner", email, name: nameFromEmail });
      navigate("/owner", { replace: true });
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold text-slate-800 text-center">
          Login to Paws &amp; Care Portal
        </h1>

        <div className="flex gap-2 text-xs bg-slate-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`flex-1 py-1.5 rounded-md ${
              role === "owner"
                ? "bg-white shadow text-indigo-700"
                : "text-slate-600"
            }`}
          >
            I&apos;m a Pet Owner
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-1.5 rounded-md ${
              role === "admin"
                ? "bg-white shadow text-indigo-700"
                : "text-slate-600"
            }`}
          >
            I&apos;m an Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                role === "admin" ? "admin@clinic.com" : "you@example.com"
              }
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={role === "admin" ? "admin123" : "••••••••"}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
