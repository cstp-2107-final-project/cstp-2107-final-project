import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { adminData } from '../../data/mockData';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState(adminData.appointments);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Appointments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Pet Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Owner</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Doctor</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Disease</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map(apt => (
              <tr key={apt.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-800 font-medium">{apt.petName}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{apt.ownerName}</td>
                <td className="px-4 py-4 text-sm text-blue-600">{apt.doctor}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{apt.date}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{apt.time}</td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">{apt.disease}</span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'scheduled' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;