import React from 'react';
import { Plus, Edit2, Trash2, Stethoscope } from 'lucide-react';
import { adminData } from '../../data/mockData';

const AdminDoctors = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Doctors Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Doctor
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminData.doctors.map(doctor => (
          <div key={doctor.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white">
                  <Stethoscope className="w-8 h-8" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium px-2 py-1 rounded-full text-xs ${doctor.status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                  {doctor.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Appointments:</span>
                <span className="font-medium text-gray-800">{doctor.appointments}</span>
              </div>
            </div>
            <div className="flex space-x-2 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button className="flex-1 flex items-center justify-center border border-red-300 text-red-600 px-3 py-2 rounded hover:bg-red-50">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDoctors;