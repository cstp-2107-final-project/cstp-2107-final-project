import React from 'react';
import { Syringe } from 'lucide-react';
import { getOwnerData } from '../../data/mockData';

const OwnerVaccinations = ({ ownerId }) => {
  const ownerData = getOwnerData(ownerId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vaccination Schedule</h2>
      
      {ownerData.vaccinations.length === 0 ? (
        <div className="text-center py-12">
          <Syringe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No vaccinations scheduled</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ownerData.vaccinations.map(vac => (
            <div key={vac.id} className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
              <div className="flex items-center justify-between mb-4">
                <Syringe className="w-10 h-10 text-orange-600" />
                <span className="px-3 py-1 bg-orange-200 text-orange-700 rounded-full text-xs font-bold">UPCOMING</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{vac.petName}</h3>
              <p className="text-gray-700 mb-1">Vaccine: <span className="font-semibold text-orange-700">{vac.vaccine}</span></p>
              <p className="text-gray-700 mb-1">Due Date: <span className="font-semibold">{vac.dueDate}</span></p>
              <p className="text-gray-700">Doctor: <span className="font-semibold">{vac.doctor}</span></p>
              <button className="mt-4 w-full bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerVaccinations;