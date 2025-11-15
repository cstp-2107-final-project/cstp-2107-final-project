import React, { useState } from 'react';
import { Plus, Calendar, X } from 'lucide-react';
import { getOwnerData, adminData } from '../../data/mockData';

const OwnerDashboard = ({ ownerId }) => {
  const ownerData = getOwnerData(ownerId);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [newPet, setNewPet] = useState({
    name: '',
    breed: '',
    age: '',
    species: 'Dog',
    weight: '',
    color: ''
  });

  const handleAddPet = (e) => {
    e.preventDefault();
    
    // Create new pet object
    const pet = {
      id: adminData.pets.length + 1,
      name: newPet.name,
      ownerId: ownerId,
      ownerName: 'John Doe', // Current user name
      breed: newPet.breed,
      age: parseInt(newPet.age),
      species: newPet.species,
      weight: newPet.weight,
      color: newPet.color
    };

    // Add to mock data
    adminData.pets.push(pet);
    
    // Reset form and close modal
    setNewPet({ name: '', breed: '', age: '', species: 'Dog', weight: '', color: '' });
    setShowAddPetModal(false);
    
    // Show success message
    alert('Pet added successfully!');
  };

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
          <button 
            onClick={() => setShowAddPetModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Pet
          </button>
        </div>
        
        {ownerData.pets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You don't have any pets registered yet.</p>
            <button 
              onClick={() => setShowAddPetModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
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
                  {pet.weight && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-medium text-gray-800">{pet.weight}</span>
                    </div>
                  )}
                  {pet.color && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium text-gray-800">{pet.color}</span>
                    </div>
                  )}
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

      {/* Add Pet Modal */}
      {showAddPetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Add New Pet</h3>
              <button 
                onClick={() => setShowAddPetModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddPet} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  required
                  value={newPet.name}
                  onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter pet name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Species *
                </label>
                <select
                  required
                  value={newPet.species}
                  onChange={(e) => setNewPet({...newPet, species: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Breed *
                </label>
                <input
                  type="text"
                  required
                  value={newPet.breed}
                  onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter breed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="30"
                  value={newPet.age}
                  onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="text"
                  value={newPet.weight}
                  onChange={(e) => setNewPet({...newPet, weight: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 30kg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <input
                  type="text"
                  value={newPet.color}
                  onChange={(e) => setNewPet({...newPet, color: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter color"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPetModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;