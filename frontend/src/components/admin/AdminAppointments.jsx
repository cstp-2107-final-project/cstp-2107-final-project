import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const API_BASE = "http://localhost:5001/api";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [pets, setPets] = useState([]);
  const [owners, setOwners] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const [formData, setFormData] = useState({
    petId: "",
    ownerId: "",
    doctorId: "",
    date: "",
    time: "",
    disease: "",
    status: "scheduled"
  });

  // ----------------------------
  // LOAD REAL BACKEND DATA
  // ----------------------------
  useEffect(() => {
    async function loadAll() {
      const [apptRes, petRes, ownerRes, docRes] = await Promise.all([
        fetch(`${API_BASE}/appointments`),
        fetch(`${API_BASE}/pets`),
        fetch(`${API_BASE}/owners`),
        fetch(`${API_BASE}/doctors`)
      ]);

      setAppointments(await apptRes.json());
      setPets(await petRes.json());
      setOwners(await ownerRes.json());
      setDoctors(await docRes.json());
    }
    loadAll();
  }, []);

  // ----------------------------
  // CREATE OR UPDATE APPOINTMENT
  // ----------------------------
  const handleSave = async () => {
    if (!formData.petId || !formData.doctorId || !formData.date || !formData.time) {
      alert("All fields are required!");
      return;
    }

    const reqData = {
      petId: formData.petId,
      doctorId: formData.doctorId,
      date: formData.date,
      time: formData.time,
      reason: formData.disease,
      status: formData.status
    };

    // UPDATE
    if (editingAppointment) {
      await fetch(`${API_BASE}/appointments/${editingAppointment._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData)
      });
    }

    // CREATE
    else {
      await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqData)
      });
    }

    // REFRESH LIST
    const updated = await fetch(`${API_BASE}/appointments`);
    setAppointments(await updated.json());

    setShowModal(false);
    setEditingAppointment(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      petId: "",
      ownerId: "",
      doctorId: "",
      date: "",
      time: "",
      disease: "",
      status: "scheduled"
    });
  };

  // ----------------------------
  // DELETE APPOINTMENT
  // ----------------------------
  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/appointments/${id}`, {
      method: "DELETE",
    });
    setAppointments(appointments.filter((a) => a._id !== id));
  };

  // ----------------------------
  // EDIT APPOINTMENT
  // ----------------------------
  const handleEdit = (apt) => {
    setEditingAppointment(apt);
    setFormData({
      petId: apt.petId?._id || apt.petId,
      doctorId: apt.doctorId?._id || apt.doctorId,
      date: apt.date,
      time: apt.time,
      disease: apt.reason,
      status: apt.status
    });
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          onClick={() => {
            resetForm();
            setEditingAppointment(null);
            setShowModal(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </button>
      </div>

      {/* APPOINTMENT TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Pet</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {appointments.map((a) => {
              const pet = pets.find((p) => p._id === a.petId || p._id === a.petId?._id);
              const doc = doctors.find((d) => d._id === a.doctorId || d._id === a.doctorId?._id);

              return (
                <tr key={a._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">{pet?.name || "Unknown"}</td>
                  <td className="px-4 py-4 text-blue-600">{doc?.name || "-"}</td>
                  <td className="px-4 py-4">{a.date}</td>
                  <td className="px-4 py-4">{a.time}</td>
                  <td className="px-4 py-4">{a.reason}</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs">
                      {a.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(a)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(a._id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold mb-4">
              {editingAppointment ? "Edit Appointment" : "New Appointment"}
            </h3>

            {/* FORM */}
            <div className="space-y-4">

              {/* PET */}
              <select
                className="w-full border p-2 rounded"
                value={formData.petId}
                onChange={(e) => setFormData({ ...formData, petId: e.target.value })}
              >
                <option value="">Select Pet</option>
                {pets.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* DOCTOR */}
              <select
                className="w-full border p-2 rounded"
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>

              {/* DATE */}
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              {/* TIME */}
              <input
                type="time"
                className="w-full border p-2 rounded"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />

              {/* REASON */}
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Reason"
                value={formData.disease}
                onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
              />

              {/* SAVE */}
              <button
                className="bg-blue-600 text-white w-full py-2 rounded-lg"
                onClick={handleSave}
              >
                {editingAppointment ? "Update" : "Create"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
