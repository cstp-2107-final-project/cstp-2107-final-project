import React from 'react';
import { Plus, PawPrint } from 'lucide-react';
import { getOwnerData } from '../../data/mockData';

const OwnerAppointments = ({ ownerId }) => {
  const ownerData = getOwnerData(ownerId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </button>
      </div>
      
      {ownerData.appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You don't have any appointments yet.</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Book Your First Appointment
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {ownerData.appointments.map(apt => (
            <div key={apt.id} className={`p-6 rounded-lg border-l-4 ${apt.status === 'scheduled' ? 'bg-blue-50 border-blue-600' : 'bg-gray-50 border-gray-400'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${apt.status === 'scheduled' ? 'bg-blue-200' : 'bg-gray-300'}`}>
                    <PawPrint className={`w-6 h-6 ${apt.status === 'scheduled' ? 'text-blue-700' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{apt.petName}</h3>
                    <p className="text-sm text-gray-600">{apt.disease}</p>
                    <p className="text-sm text-blue-600 font-medium mt-1">{apt.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{apt.date}</p>
                  <p className="text-sm text-gray-600">{apt.time}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'scheduled' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerAppointments;