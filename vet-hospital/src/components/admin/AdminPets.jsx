import React from 'react';
import { Plus, Edit2, Trash2, PawPrint } from 'lucide-react';
import { adminData } from '../../data/mockData';

const AdminPets = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Pets</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Register Pet
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminData.pets.map(pet => (
          <div key={pet.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-400 transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {pet.name[0]}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                  <p className="text-sm text-gray-600">{pet.breed}</p>
                </div>
              </div>
              <PawPrint className="w-6 h-6 text-gray-400" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Species:</span>
                <span className="font-medium text-gray-800">{pet.species}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium text-gray-800">{pet.age} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Owner:</span>
                <span className="font-medium text-gray-800">{pet.ownerName}</span>
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

export default AdminPets;