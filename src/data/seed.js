// src/data/seed.js

export const seed = {
  owners: [
    {
      id: "o1",
      name: "Rita Singh",
      email: "rita@example.com",
      phone: "604-555-1234",
      address: "123 Main St, Vancouver",
    },
    {
      id: "o2",
      name: "Daniel Park",
      email: "daniel@example.com",
      phone: "604-555-5678",
      address: "456 Oak Ave, Burnaby",
    },
  ],

  pets: [
    {
      id: "p1",
      name: "Buddy",
      species: "Dog",
      breed: "Labrador",
      age: 4,
      ownerId: "o1",
    },
    {
      id: "p2",
      name: "Milo",
      species: "Cat",
      breed: "Persian",
      age: 2,
      ownerId: "o1",
    },
    {
      id: "p3",
      name: "Luna",
      species: "Dog",
      breed: "Husky",
      age: 3,
      ownerId: "o2",
    },
  ],

  doctors: [
    {
      id: "d1",
      name: "Dr. Aman Gill",
      specialty: "General Practice",
      phone: "604-555-9999",
      email: "gill@petclinic.ca",
    },
    {
      id: "d2",
      name: "Dr. Chen Wu",
      specialty: "Vaccination & Preventive Care",
      phone: "604-555-2222",
      email: "chen@petclinic.ca",
    },
  ],

  vaccinations: [
    {
      id: "v1",
      petId: "p1",
      vaccine: "Rabies",
      date: "2025-01-10",
      nextDue: "2026-01-10",
      doctorId: "d2",
    },
    {
      id: "v2",
      petId: "p1",
      vaccine: "Parvovirus",
      date: "2024-12-01",
      nextDue: "2025-12-01",
      doctorId: "d2",
    },
    {
      id: "v3",
      petId: "p2",
      vaccine: "FVRCP",
      date: "2025-03-20",
      nextDue: "2026-03-20",
      doctorId: "d2",
    },
  ],

  appointments: [
    {
      id: "a1",
      petId: "p1",
      doctorId: "d1",
      date: "2025-11-15",
      time: "10:30 AM",
      reason: "Routine Checkup",
      status: "Scheduled",
    },
    {
      id: "a2",
      petId: "p3",
      doctorId: "d1",
      date: "2025-11-20",
      time: "02:00 PM",
      reason: "Limping",
      status: "Scheduled",
    },
  ],

  invoices: [
    {
      id: "i1",
      petId: "p1",
      description: "Vaccination package",
      amount: 150,
      paid: false,
      date: "2025-11-01",
    },
    {
      id: "i2",
      petId: "p2",
      description: "Checkup",
      amount: 80,
      paid: true,
      date: "2025-10-15",
    },
  ],
};
