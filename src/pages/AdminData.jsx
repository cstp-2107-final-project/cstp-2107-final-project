import { loadDB } from "../store/db";

export default function AdminData() {
  const db = loadDB();
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🔐 Data Storage Overview</h1>
      <h2 className="text-xl font-semibold mb-3">Admin Credentials</h2>
      <pre className="bg-gray-100 p-4 rounded mb-6">
        {JSON.stringify(db.admin || { email: "admin@clinic.com", password: "admin123" }, null, 2)}
      </pre>

      <h2 className="text-xl font-semibold mb-3">Owners</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(db.owners || [], null, 2)}
      </pre>
    </div>
  );
}
