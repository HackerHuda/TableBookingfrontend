'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Availability({ selectedDate, selectedTime }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedDate && selectedTime) {
      fetchAvailability();
    }
  }, [selectedDate, selectedTime]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      // Fetch booked slots for the selected date
      const response = await axios.get('/api/bookings', {
        params: { date: selectedDate, time: selectedTime }, // Send both date and time to backend
      });

      // If there are booked slots, map them to the 'time' field
      const bookedSlots = response.data.map((booking) => booking.time);
      console.log('Booked Slots:', bookedSlots);

      // Generate all possible time slots for the selected date
      const allSlots = generateTimeSlots();
      console.log('All Slots:', allSlots);

      // Filter out the booked slots to find the free slots
      const freeSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
      console.log('Available Slots:', freeSlots);

      // Set available slots or show message if none
      if (freeSlots.length > 0) {
        setAvailableSlots(freeSlots);
        setErrorMessage('');
      } else {
        setAvailableSlots([]);
        setErrorMessage('No slots available for the selected date and time.');
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setErrorMessage('Error fetching availability. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i < 22; i++) {
      slots.push(`${i}:00`, `${i}:30`); // Generates time slots from 9:00 AM to 9:30 PM
    }
    return slots;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : availableSlots.length > 0 ? (
        <ul className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <li
              key={slot}
              className="p-2 bg-green-200 rounded text-center cursor-pointer hover:bg-green-300"
            >
              {slot}
            </li>
          ))}
        </ul>
      ) : (
        <p>No slots available for the selected date and time.</p>
      )}
    </div>
  );
}
