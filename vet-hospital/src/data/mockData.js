// Mock data for the application
export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    fullName: 'Sarah Smith',
    email: 'sarah.smith@vethospital.com'
  },
  {
    id: 2,
    username: 'owner',
    password: 'owner123',
    role: 'owner',
    fullName: 'John Doe',
    email: 'john.doe@email.com'
  }
];

export const adminData = {
  appointments: [
    { id: 1, petName: 'Max', ownerName: 'John Doe', ownerId: 2, doctor: 'Dr.Jacob Ryan', date: '2024-11-15', time: '10:00', disease: 'Fever', status: 'scheduled' },
    { id: 2, petName: 'Bella', ownerName: 'Sarah Johnson', ownerId: 3, doctor: 'Dr.Rajesh', date: '2024-11-15', time: '11:30', disease: 'Cholera', status: 'scheduled' },
    { id: 3, petName: 'Charlie', ownerName: 'Mike Wilson', ownerId: 4, doctor: 'Dr.Jay Soni', date: '2024-11-16', time: '09:00', disease: 'Jaundice', status: 'completed' },
    { id: 4, petName: 'Luna', ownerName: 'Emily Davis', ownerId: 5, doctor: 'Dr.John Deo', date: '2024-11-16', time: '14:00', disease: 'Typhoid', status: 'scheduled' },
    { id: 5, petName: 'Rocky', ownerName: 'Tom Brown', ownerId: 6, doctor: 'Dr.Megha Trivedi', date: '2024-11-17', time: '10:30', disease: 'Infection', status: 'scheduled' },
  ],
  doctors: [
    { id: 1, name: 'Dr.Jay Soni', qualification: 'MBBS,MD', status: 'Available', appointments: 12 },
    { id: 2, name: 'Dr.Sarah Smith', qualification: 'BDS,MDS', status: 'Absent', appointments: 8 },
    { id: 3, name: 'Dr.Megha Trivedi', qualification: 'BHMS', status: 'Available', appointments: 15 },
    { id: 4, name: 'Dr.John Deo', qualification: 'MBBS,MS', status: 'Available', appointments: 10 },
    { id: 5, name: 'Dr.Jacob Ryan', qualification: 'MBBS,MD', status: 'Absent', appointments: 7 },
  ],
  pets: [
    { id: 1, name: 'Max', ownerId: 2, ownerName: 'John Doe', breed: 'Golden Retriever', age: 3, species: 'Dog' },
    { id: 2, name: 'Luna', ownerId: 2, ownerName: 'John Doe', breed: 'Persian Cat', age: 2, species: 'Cat' },
    { id: 3, name: 'Bella', ownerId: 3, ownerName: 'Sarah Johnson', breed: 'Labrador', age: 4, species: 'Dog' },
    { id: 4, name: 'Charlie', ownerId: 4, ownerName: 'Mike Wilson', breed: 'Beagle', age: 2, species: 'Dog' },
    { id: 5, name: 'Rocky', ownerId: 6, ownerName: 'Tom Brown', breed: 'German Shepherd', age: 5, species: 'Dog' },
  ],
  vaccinations: [
    { id: 1, petId: 1, petName: 'Max', ownerName: 'John Doe', ownerId: 2, vaccine: 'Rabies', dueDate: '2024-11-20', doctor: 'Dr.Jacob Ryan', status: 'scheduled' },
    { id: 2, petId: 2, petName: 'Bella', ownerName: 'Sarah Johnson', ownerId: 3, vaccine: 'DHPP', dueDate: '2024-11-18', doctor: 'Dr.Rajesh', status: 'scheduled' },
    { id: 3, petId: 5, petName: 'Rocky', ownerName: 'Tom Brown', ownerId: 6, vaccine: 'Bordetella', dueDate: '2024-11-25', doctor: 'Dr.Jay Soni', status: 'scheduled' },
    { id: 4, petId: 4, petName: 'Charlie', ownerName: 'Mike Wilson', ownerId: 4, vaccine: 'Leptospirosis', dueDate: '2024-11-22', doctor: 'Dr.Jay Soni', status: 'scheduled' },
  ],
  billing: [
    { id: 1, patientName: 'Max', ownerName: 'John Doe', ownerId: 2, service: 'Consultation', amount: 150, date: '2024-11-14', status: 'paid' },
    { id: 2, patientName: 'Bella', ownerName: 'Sarah Johnson', ownerId: 3, service: 'Vaccination', amount: 80, date: '2024-11-13', status: 'pending' },
    { id: 3, patientName: 'Charlie', ownerName: 'Mike Wilson', ownerId: 4, service: 'Surgery', amount: 500, date: '2024-11-12', status: 'paid' },
    { id: 4, patientName: 'Luna', ownerName: 'Emily Davis', ownerId: 5, service: 'X-Ray', amount: 200, date: '2024-11-14', status: 'paid' },
    { id: 5, patientName: 'Rocky', ownerName: 'Tom Brown', ownerId: 6, service: 'Blood Test', amount: 120, date: '2024-11-13', status: 'pending' },
  ],
  stats: {
    appointments: 650,
    operations: 54,
    newPatients: 129,
    earnings: 20125
  }
};

// Helper function to get owner's data only
export const getOwnerData = (ownerId) => {
  return {
    pets: adminData.pets.filter(pet => pet.ownerId === ownerId),
    appointments: adminData.appointments.filter(apt => apt.ownerId === ownerId),
    vaccinations: adminData.vaccinations.filter(vac => vac.ownerId === ownerId),
    billing: adminData.billing.filter(bill => bill.ownerId === ownerId)
  };
};