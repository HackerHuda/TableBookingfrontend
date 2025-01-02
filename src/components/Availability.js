'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Availability({ selectedDate, selectedTime }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedDate && selectedTime) {
      fetchAvailability();
    }
  }, [selectedDate, selectedTime]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/bookings', {
        params: { date: selectedDate },
      });
      const bookedSlots = response.data.map((booking) => booking.time);
      console.log('Booked Slots:', bookedSlots);

      const allSlots = generateTimeSlots();
      console.log('All Slots:', allSlots);

      const freeSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
      console.log('Available Slots:', freeSlots);

      setAvailableSlots(freeSlots);
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i < 22; i++) {
      slots.push(${i}:00, ${i}:30);
    }
    return slots;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
      {loading ? (
        <p>Loading...</p>
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
        <p>No error</p>
      )}
    </div>
  );
}
