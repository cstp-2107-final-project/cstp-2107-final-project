import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_BASE = "http://localhost:5001/api";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function load() {
      const apptRes = await fetch(`${API_BASE}/appointments`);
      const petRes = await fetch(`${API_BASE}/pets`);

      const appts = await apptRes.json();
      const pets = await petRes.json();

      const myAppts = appts.filter(
        (a) => a.doctorId === user.uid || a.doctorId?._id === user.uid
      );

      const myPets = pets.filter((p) =>
        myAppts.some((a) => a.petId === p._id || a.petId?._id === p._id)
      );

      setAppointments(myAppts);
      setPatients(myPets);
    }

    load();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Welcome, {user?.name}
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">Today's Appointments</h3>
          <p className="text-3xl font-bold mt-2">{appointments.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">Patients</h3>
          <p className="text-3xl font-bold mt-2">{patients.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500 text-sm">Completed Cases</h3>
          <p className="text-3xl font-bold mt-2">
            {appointments.filter((a) => a.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Upcoming appointments */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>

        {appointments.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments.</p>
        ) : (
          <ul className="space-y-3">
            {appointments.map((a) => (
              <li
                key={a._id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
              >
                <p className="text-gray-800 font-medium">
                  {a.date} — {a.time}
                </p>
                <p className="text-gray-600 text-sm">
                  Pet: {a.petName || a.pet?.name}
                </p>
                <p className="text-gray-600 text-sm">
                  Status:{" "}
                  <span className="text-blue-600 font-medium">
                    {a.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
