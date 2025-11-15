import React, { useState } from 'react';
import { Plus, Edit2, Trash2, PawPrint, X } from 'lucide-react';
import { adminData } from '../../data/mockData';

const AdminPets = () => {
  const [pets, setPets] = useState(adminData.pets);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    species: 'Dog',
    ownerName: ''
  });

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      species: pet.species,
      ownerName: pet.ownerName
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedPets = pets.map(pet => 
      pet.id === editingPet.id 
        ? { ...pet, ...formData, age: parseInt(formData.age) }
        : pet
    );
    
    setPets(updatedPets);
    adminData.pets = updatedPets;
    
    setShowEditModal(false);
    setEditingPet(null);
    alert('Pet information updated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this pet from the system?')) {
      const updatedPets = pets.filter(pet => pet.id !== id);
      setPets(updatedPets);
      adminData.pets = updatedPets;
      alert('Pet removed successfully!');
    }
  };

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
        {pets.map(pet => (
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
              <button 
                onClick={() => handleEdit(pet)}
                className="flex-1 flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </button>
              <button 
                onClick={() => handleDelete(pet.id)}
                className="flex-1 flex items-center justify-center border border-red-300 text-red-600 px-3 py-2 rounded hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Edit Pet Information</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
                <select
                  value={formData.species}
                  onChange={(e) => setFormData({...formData, species: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                <input
                  type="text"
                  value={formData.breed}
                  onChange={(e) => setFormData({...formData, breed: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Owner Name</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPets;