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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-16 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-green-100 p-8 animate-fadeIn">

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-green-700 text-center mb-4">
          Login to Paws &amp; Care Portal
        </h1>

        {/* Role Toggle */}
        <div className="flex gap-2 text-xs bg-green-50 border border-green-100 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setRole("owner")}
            className={`flex-1 py-2 rounded-lg transition ${
              role === "owner"
                ? "bg-white shadow text-green-700 font-semibold"
                : "text-gray-600"
            }`}
          >
            I&apos;m a Pet Owner
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 rounded-lg transition ${
              role === "admin"
                ? "bg-white shadow text-green-700 font-semibold"
                : "text-gray-600"
            }`}
          >
            I&apos;m an Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          
          {/* Email */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={
                role === "admin" ? "admin@clinic.com" : "you@example.com"
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-green-200 rounded-xl px-4 py-2.5 text-sm 
                         focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={role === "admin" ? "admin123" : "••••••••"}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold 
                       hover:bg-green-700 transition shadow-sm mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
