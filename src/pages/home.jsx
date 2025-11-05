import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white text-center p-8">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">Welcome to PetCare Clinic</h1>
      <p className="max-w-2xl text-gray-600 mb-8">
        We provide top-quality veterinary care, vaccination tracking, and appointment scheduling for your beloved pets.
        Manage everything easily from one place — whether you are a pet owner or clinic admin.
      </p>

      <div className="flex gap-6">
        <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700">Owner Login</Link>
        <Link to="/admin" className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800">Admin Login</Link>
        <Link to="/about" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">Clinic Info</Link>
      </div>
    </div>
  );
}
