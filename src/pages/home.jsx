// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white text-center p-8">
//       <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to PetCare Clinic</h1>
//       <p className="max-w-2xl text-gray-600 mb-8">
//         We provide top-quality veterinary care, vaccination tracking, and appointment scheduling for your beloved pets.
//         Manage everything easily from one place — whether you are a pet owner or clinic admin.
//       </p>

//       <div className="flex gap-6">
//         <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700">Sign Up/ Login</Link>
//         <Link to="/admin" className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800">Admin Login</Link> 
//         <Link to="/about" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">Clinic Info</Link>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FaDog, FaCalendarCheck, FaSyringe, FaShieldAlt, FaHeartbeat, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

export default function Home() {
  // --- Rotating pet-care tips ---
  const tips = useMemo(
    () => [
      "Keep vaccinations up to date for long-term health.",
      "Schedule annual checkups—even for indoor pets.",
      "Brush your pet’s teeth 2–3 times a week.",
      "Measure food to avoid overfeeding.",
      "Regular exercise helps mood and weight control.",
    ],
    []
  );
  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 3500);
    return () => clearInterval(id);
  }, [tips.length]);

  // --- Lightweight “check availability” widget (client-only demo) ---
  const [petName, setPetName] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);
  const checkSlots = (e) => {
    e.preventDefault();
    if (!date) return setResult({ type: "error", text: "Pick a date first." });
    const hour = new Date(date + "T09:00").getHours();
    // Fun demo rule: even hours = available, odd = waitlist
    const available = hour % 2 === 0;
    setResult(
      available
        ? {
            type: "ok",
            text: `Great news${petName ? `, ${petName}` : ""}! Morning and afternoon slots are open on your date.`,
          }
        : { type: "warn", text: "Limited slots left — join the waitlist or try another day." }
    );
  };

  // --- Testimonials ---
  const testimonials = [
    {
      name: "Sofia & Milo",
      quote: "The reminders saved us! No more missed vaccines.",
      rating: 5,
    },
    {
      name: "Arjun & Cookie",
      quote: "Booked an appointment in under a minute. So easy.",
      rating: 5,
    },
    {
      name: "Liam & Nala",
      quote: "Staff were amazing and the dashboard is super clear.",
      rating: 4,
    },
  ];
  const [tIndex, setTIndex] = useState(0);
  const nextT = () => setTIndex((t) => (t + 1) % testimonials.length);
  const prevT = () => setTIndex((t) => (t - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:px-10 lg:px-16">
        {/* playful floating paw */}
        <div className="absolute -right-10 -top-10 opacity-10 select-none text-[10rem] rotate-12">🐾</div>
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-indigo-700">
              Happy pets. <span className="text-indigo-500">Healthier</span> lives.
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-prose">
              Manage vaccinations, appointments, billing, and more — all in one friendly dashboard for pet parents and clinics.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] transition"
              >
                Sign up / Log in
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 shadow-sm text-gray-700"
              >
                Learn about our clinics
              </Link>
            </div>

            {/* Rotating tip */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-700 text-sm">
              <FaShieldAlt />
              <span className="font-medium">Tip:</span>
              <span className="italic">{tips[tipIndex]}</span>
            </div>
          </div>

          {/* Availability widget */}
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaCalendarCheck className="text-indigo-600" /> Quick appointment check
            </h2>
            <p className="text-sm text-gray-500 mt-1">(Demo only — no data saved)</p>
            <form onSubmit={checkSlots} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Pet name (optional)</label>
                <input
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g., Luna"
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">Preferred date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 mt-2 w-full rounded-lg bg-indigo-600 text-white py-2.5 hover:bg-indigo-700"
              >
                Check availability
              </button>
            </form>
            {result && (
              <div
                className={
                  "mt-4 rounded-lg px-4 py-3 text-sm " +
                  (result.type === "ok"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : result.type === "warn"
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    : "bg-red-50 text-red-700 border border-red-200")
                }
              >
                {result.text}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h3 className="text-2xl font-bold text-gray-900">Everything your clinic needs</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <FaDog />, title: "Pet profiles", desc: "Keep records, notes, and weights in one place." },
              { icon: <FaSyringe />, title: "Vaccinations", desc: "Track due dates and get smart reminders." },
              { icon: <FaCalendarCheck />, title: "Appointments", desc: "Book, reschedule, and auto-confirm visits." },
              { icon: <FaHeartbeat />, title: "Wellness", desc: "See trends and get personalized tips." },
            ].map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
              >
                <div className="text-2xl text-indigo-600 group-hover:scale-110 transition inline-flex">{f.icon}</div>
                <h4 className="mt-3 font-semibold text-gray-900">{f.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
                <Link to="/login" className="mt-3 inline-block text-sm text-indigo-600 hover:underline">
                  Try it now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 pb-16 md:px-10 lg:px-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Loved by pet parents</h3>
            <div className="flex gap-2">
              <button onClick={prevT} className="p-2 rounded-full border hover:bg-white" aria-label="Previous">
                <FaChevronLeft />
              </button>
              <button onClick={nextT} className="p-2 rounded-full border hover:bg-white" aria-label="Next">
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all">
              {testimonials.slice(tIndex).concat(testimonials.slice(0, tIndex)).slice(0, 3).map((t, i) => (
                <figure key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <blockquote className="mt-2 text-gray-700">“{t.quote}”</blockquote>
                  <figcaption className="mt-3 text-sm font-medium text-gray-900">{t.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-indigo-600 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">Ready to give your pet VIP care?</h3>
            <p className="mt-2 text-indigo-100">Create an account to start tracking vaccines, appointments, and wellness — free to try.</p>
          </div>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50"
          >
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
}
