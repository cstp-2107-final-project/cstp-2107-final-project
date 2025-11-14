export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-left animate-fadeIn">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 tracking-tight">
          About Our Clinics
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-3xl">
          We proudly serve multiple locations across the Lower Mainland with 
          compassionate care and experienced veterinary staff available 7 days 
          a week. Your pets’ health and comfort are our top priority.
        </p>

        {/* Info Card */}
        <div className="bg-white shadow-md rounded-2xl p-8 border border-green-100">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Clinic Information
          </h2>

          <ul className="space-y-5 text-gray-700 text-lg">
            <li>
              <span className="font-semibold text-green-800">Surrey Branch:</span>{" "}
              120A Street, Surrey BC
            </li>

            <li>
              <span className="font-semibold text-green-800">Burnaby Branch:</span>{" "}
              5000 Kingsway Ave, Burnaby BC
            </li>

            <li>
              <span className="font-semibold text-green-800">Contact:</span>{" "}
              (604) 555-1212
            </li>

            <li>
              <span className="font-semibold text-green-800">Doctors Available:</span>{" "}
              Dr. Lee, Dr. Gomez, Dr. Patel
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
