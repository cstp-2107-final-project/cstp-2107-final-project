export default function About() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-green-700 mb-4">About Our Clinics</h1>
      <p className="text-gray-700 mb-6 max-w-3xl">
        We have multiple locations to serve you better. Our veterinary specialists are available 7 days a week for all kinds of pet care.
      </p>
      <ul className="space-y-3 text-lg">
        <li><strong> Surrey Branch:</strong> 120A Street, Surrey BC</li>
        <li><strong> Burnaby Branch:</strong> 5000 Kingsway Ave, Burnaby BC</li>
        <li><strong> Contact:</strong> (604) 555-1212</li>
        <li><strong> Doctors Available:</strong> Dr. Lee, Dr. Gomez, Dr. Patel</li>
      </ul>
    </div>
  );
}
