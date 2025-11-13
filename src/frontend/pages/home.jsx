// src/frontend/pages/home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/guards.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      <section className="bg-gradient-to-br from-indigo-50 to-sky-50 rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Paws &amp; Care Veterinary Clinic
        </h1>
        <p className="text-slate-700 mb-6">
          Manage pet vaccinations, doctor visits, appointments, and billing in a
          single, easy-to-use portal. Owners see their pets; admins see the
          whole clinic.
        </p>

        <div className="flex flex-wrap gap-3">
          {!user && (
            <>
              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium"
              >
                I&apos;m a Pet Owner
              </Link>
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-lg border border-indigo-600 text-indigo-700 text-sm font-medium"
              >
                Admin Login
              </Link>
            </>
          )}
          {user && (
            <Link
              to={user.role === "admin" ? "/admin" : "/owner"}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium"
            >
              Go to my dashboard
            </Link>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4 text-sm">
        <InfoCard
          title="Digital records"
          text="Vaccinations, appointments, and billing are stored securely in MongoDB."
        />
        <InfoCard
          title="Admin dashboard"
          text="See all owners, pets, doctors, vaccinations, and upcoming appointments."
        />
        <InfoCard
          title="Owner dashboard"
          text="Owners see only their pets, upcoming visits, and outstanding bills."
        />
      </section>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h2>
      <p className="text-slate-600">{text}</p>
    </div>
  );
}
