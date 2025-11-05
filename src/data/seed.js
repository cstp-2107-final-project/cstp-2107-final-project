export const seed = {
  pets: [
    {
      id: "p1",
      name: "Buddy",
      species: "Dog",
      breed: "Labrador",
      age: 4,
      owner: "Rita Singh",
      contact: "604-555-1234",
    },
    {
      id: "p2",
      name: "Milo",
      species: "Cat",
      breed: "Persian",
      age: 2,
      owner: "Karan Gill",
      contact: "604-555-5678",
    },
  ],
  appointments: [
    {
      id: "a1",
      petId: "p1",
      doctor: "Dr. Gill",
      date: "2025-11-06",
      time: "10:30 AM",
      reason: "Routine Checkup",
      status: "Scheduled",
    },
  ],
};
