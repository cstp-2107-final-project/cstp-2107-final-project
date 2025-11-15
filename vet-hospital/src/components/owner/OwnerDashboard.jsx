import React from 'react';
import { Plus, Calendar } from 'lucide-react';
import { getOwnerData } from '../../data/mockData';

const OwnerDashboard = ({ ownerId }) => {
  const ownerData = getOwnerData(ownerId);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome Back, Pet Parent! 🐾</h1>
        <p className="text-blue-100">Manage your pets' health and appointments</p>
      </div>

      {/* My Pets */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Pets</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Pet
          </button>
        </div>
        
        {ownerData.pets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You don't have any pets registered yet.</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Register Your First Pet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownerData.pets.map(pet => (
              <div key={pet.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                      {pet.name[0]}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                      <p className="text-sm text-gray-600">{pet.breed}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium text-gray-800">{pet.age} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Species:</span>
                    <span className="font-medium text-gray-800">{pet.species}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Appointments</h2>
        {ownerData.appointments.filter(a => a.status === 'scheduled').length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ownerData.appointments.filter(a => a.status === 'scheduled').map(apt => (
              <div key={apt.id} className="flex items-center justify-between p-5 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-10 h-10 text-blue-600" />
                  <div>
                    <p className="font-bold text-gray-800">{apt.petName} - {apt.disease}</p>
                    <p className="text-sm text-gray-600">{apt.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{apt.date}</p>
                  <p className="text-sm text-gray-600">{apt.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;