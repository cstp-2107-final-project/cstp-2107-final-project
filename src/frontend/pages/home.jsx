// src/frontend/pages/home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/guards.jsx";
import heroImg from "../../assets/clinic-hero.jpg"; // <-- add this import

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6 space-y-12 animate-fadeIn">
      
      {/* HERO SECTION */}
      <section className="bg-white border border-green-100 rounded-2xl p-8 md:p-10 shadow-md max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* LEFT: TEXT + BUTTONS */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 tracking-tight">
              Paws &amp; Care Veterinary Clinic
            </h1>

            <p className="text-gray-700 text-lg max-w-2xl mb-8">
              Manage vaccinations, doctor visits, appointments, and billing in a
              single, easy-to-use portal. Owners view their pets, and admins
              manage the whole clinic in one place.
            </p>

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
          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex-1 hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-green-100 opacity-60 blur-xl" />
              <img
                src={heroImg}
                alt="Vet with a puppy and kitten"
                className="relative rounded-3xl shadow-md ring-1 ring-green-100 object-cover w-full h-64"
              />
            </div>
          </div>
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
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 hover:shadow-md hover:bg-green-50/40 transition cursor-pointer">
      <h2 className="font-semibold text-green-700 mb-2 text-base">{title}</h2>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
