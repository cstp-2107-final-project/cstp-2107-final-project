import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_BASE = "http://localhost:5001/api";

export default function DoctorPatients() {
  const { user } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function load() {
      const apptRes = await fetch(`${API_BASE}/appointments`);
      const petRes = await fetch(`${API_BASE}/pets`);

      const appts = await apptRes.json();
      const allPets = await petRes.json();

      const myAppts = appts.filter(
        (a) => a.doctorId === user.uid || a.doctorId?._id === user.uid
      );

      const petIds = new Set(myAppts.map((a) => a.petId));

      const myPets = allPets.filter((p) => petIds.has(p._id));

      setAppointments(myAppts);
      setPets(myPets);
    }

    load();
  }, [user]);

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Your Patients
      </h2>

      {pets.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pets.map((p) => (
            <div
              key={p._id}
              className="border border-gray-200 p-6 rounded-xl hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {p.name}
              </h3>
              <p className="text-gray-600">Breed: {p.breed}</p>
              <p className="text-gray-600">Age: {p.age} years</p>
              <p className="text-gray-600">Owner: {p.ownerName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
