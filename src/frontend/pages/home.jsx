import { Link } from "react-router-dom";
import { useAuth } from "../../auth/guards.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6 space-y-12 animate-fadeIn">
      
      {/* HERO SECTION */}
      <section className="bg-white border border-green-100 rounded-2xl p-10 shadow-md max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-green-700 mb-4 tracking-tight">
          Paws &amp; Care Veterinary Clinic
        </h1>

        <p className="text-gray-700 text-lg max-w-2xl mb-8">
          Manage vaccinations, doctor visits, appointments, and billing in a
          single, easy-to-use portal. Owners view their pets, and admins
          manage the whole clinic in one place.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-wrap gap-4">
          {!user && (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold 
                           shadow-sm hover:bg-green-700 transition"
              >
                I&apos;m a Pet Owner
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 rounded-xl border border-green-600 text-green-700 
                           text-sm font-semibold hover:bg-green-50 transition"
              >
                Admin Login
              </Link>
            </>
          )}

          {user && (
            <Link
              to={user.role === "admin" ? "/admin" : "/owner"}
              className="px-6 py-3 rounded-xl bg-green-600 text-white text-sm font-semibold 
                         shadow-sm hover:bg-green-700 transition"
            >
              Go to my dashboard
            </Link>
          )}
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <InfoCard
          title="Digital Records"
          text="Vaccinations, appointments, and billing are securely stored and organized."
        />
        <InfoCard
          title="Admin Dashboard"
          text="Manage owners, pets, doctors, vaccinations, and upcoming appointments."
        />
        <InfoCard
          title="Owner Dashboard"
          text="Pet owners view vaccinations, upcoming visits, and outstanding bills."
        />
      </section>
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 hover:shadow-md transition">
      <h2 className="font-semibold text-green-700 mb-2 text-base">{title}</h2>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
