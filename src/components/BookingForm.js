'use client';
import { useState } from 'react';
import axios from 'axios';
import Availability from './Availability';
import Summary from './Summary';

export default function BookingForm() {
  const [form, setForm] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    contact: '',
  });
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', form);
      setBookingDetails(response.data);
      alert('Booking Successful!');
    } catch (error) {
      console.error(error);
      alert('Failed to book. Try again!');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          placeholder="Number of Guests"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="tel"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>
      <Availability selectedDate={form.date} selectedTime={form.time} />
      <Summary bookingDetails={bookingDetails} />
    </div>
  );
}
