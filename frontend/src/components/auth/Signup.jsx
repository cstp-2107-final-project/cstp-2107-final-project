import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Signup({ onSwitchToLogin }) {
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "owner",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);
      await signup(form.name, form.email, form.password, form.role);

      // If signup succeeds, AuthContext sets user & role.
      // App.jsx will switch to the main app automatically.
      alert("Account created successfully! You can now log in.");
      onSwitchToLogin();
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message || "Failed to sign up. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-6 text-center">Create an Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-lg"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-3 rounded-lg"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="owner">Pet Owner</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg ${
              submitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?
            <button
              type="button"
              className="text-blue-600 ml-1"
              onClick={onSwitchToLogin}
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
