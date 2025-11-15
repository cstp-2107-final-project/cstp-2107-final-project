import React from 'react';
import { Plus, Syringe } from 'lucide-react';
import { adminData } from '../../data/mockData';

const AdminVaccinations = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Upcoming Vaccinations</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Vaccination
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminData.vaccinations.map(vac => (
          <div key={vac.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-3">
              <Syringe className="w-8 h-8 text-blue-600" />
              <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium">Due</span>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{vac.petName}</h3>
            <p className="text-sm text-gray-600 mb-1">Owner: {vac.ownerName}</p>
            <p className="text-sm text-gray-600 mb-1">Vaccine: <span className="font-medium text-blue-600">{vac.vaccine}</span></p>
            <p className="text-sm text-gray-600 mb-1">Due Date: {vac.dueDate}</p>
            <p className="text-sm text-gray-600">Doctor: {vac.doctor}</p>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                Complete
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-50">
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVaccinations;