import React, { useState } from 'react';
import { Plus, PawPrint, X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { getOwnerData, adminData } from '../../data/mockData';

const OwnerAppointments = ({ ownerId }) => {
  const ownerData = getOwnerData(ownerId);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    petId: '',
    doctor: '',
    time: '',
    reason: ''
  });

  // Generate calendar days
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
    }
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    const pet = ownerData.pets.find(p => p.id === parseInt(bookingForm.petId));
    
    const appointment = {
      id: adminData.appointments.length + 1,
      petName: pet.name,
      ownerName: 'John Doe',
      ownerId: ownerId,
      doctor: bookingForm.doctor,
      date: formatDate(selectedDate),
      time: bookingForm.time,
      disease: bookingForm.reason,
      status: 'scheduled'
    };

    adminData.appointments.push(appointment);
    
    setShowBookingModal(false);
    setSelectedDate(null);
    setBookingForm({ petId: '', doctor: '', time: '', reason: '' });
    
    alert('Appointment booked successfully!');
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Appointments</h2>
        <button 
          onClick={() => setShowBookingModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </button>
      </div>
      
      {ownerData.appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You don't have any appointments yet.</p>
          <button 
            onClick={() => setShowBookingModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
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

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">Book Appointment</h3>
              <button 
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-lg font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h4>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  {getDaysInMonth(currentMonth).map((date, index) => (
                    <button
                      key={index}
                      onClick={() => date && handleDateSelect(date)}
                      disabled={!isDateAvailable(date)}
                      className={`
                        aspect-square p-2 rounded-lg text-sm
                        ${!date ? 'invisible' : ''}
                        ${!isDateAvailable(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 cursor-pointer'}
                        ${selectedDate && date && formatDate(date) === formatDate(selectedDate) ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                        ${date && formatDate(date) === formatDate(new Date()) ? 'border-2 border-blue-400' : ''}
                      `}
                    >
                      {date ? date.getDate() : ''}
                    </button>
                  ))}
                </div>
                
                {selectedDate && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Selected Date:</p>
                    <p className="font-semibold text-blue-600">{formatDate(selectedDate)}</p>
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Pet *
                  </label>
                  <select
                    required
                    value={bookingForm.petId}
                    onChange={(e) => setBookingForm({...bookingForm, petId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a pet</option>
                    {ownerData.pets.map(pet => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name} ({pet.breed})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Doctor *
                  </label>
                  <select
                    required
                    value={bookingForm.doctor}
                    onChange={(e) => setBookingForm({...bookingForm, doctor: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a doctor</option>
                    {adminData.doctors.filter(d => d.status === 'Available').map(doctor => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.qualification}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <select
                    required
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    required
                    value={bookingForm.reason}
                    onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    placeholder="Describe the reason for your visit..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerAppointments;