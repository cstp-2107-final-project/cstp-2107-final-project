import React from 'react';
import { Syringe, Calendar } from 'lucide-react';
import { getOwnerData } from '../../data/mockData';

const OwnerVaccinations = ({ ownerId }) => {
  const ownerData = getOwnerData(ownerId);

  // Function to add reminder to Google Calendar
  const addToGoogleCalendar = (vaccination) => {
    const startDate = new Date(vaccination.dueDate + 'T10:00:00');
    const endDate = new Date(vaccination.dueDate + 'T11:00:00');
    
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const title = `Vaccination: ${vaccination.vaccine} for ${vaccination.petName}`;
    const description = `Vaccination appointment for ${vaccination.petName}%0ADoctor: ${vaccination.doctor}%0AVaccine: ${vaccination.vaccine}`;
    const location = 'Veterinary Hospital';

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${description}&location=${encodeURIComponent(location)}`;

    window.open(googleCalendarUrl, '_blank');
  };

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
            <div key={vac.id} className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-4">
                <Syringe className="w-10 h-10 text-orange-600" />
                <span className="px-3 py-1 bg-orange-200 text-orange-700 rounded-full text-xs font-bold">UPCOMING</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{vac.petName}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700 flex items-center">
                  <span className="font-semibold mr-2">Vaccine:</span>
                  <span className="text-orange-700">{vac.vaccine}</span>
                </p>
                <p className="text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-semibold mr-2">Due Date:</span>
                  <span>{vac.dueDate}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold mr-2">Doctor:</span>
                  <span>{vac.doctor}</span>
                </p>
              </div>
              <button 
                onClick={() => addToGoogleCalendar(vac)}
                className="mt-4 w-full bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 flex items-center justify-center font-medium transition"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Google Calendar
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Information Box */}
      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Vaccination Reminders</h4>
        <p className="text-sm text-blue-700">
          Click "Add to Google Calendar" to set up automatic reminders for your pet's vaccinations. 
          You'll receive notifications on your phone and email before the due date.
        </p>
      </div>
    </div>
  );
};

export default OwnerVaccinations;