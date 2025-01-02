'use client';
export default function Summary({ bookingDetails }) {
    if (!bookingDetails) return null;
  
    const { date, time, guests, name, contact } = bookingDetails;
  
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
        <ul className="space-y-2">
          <li>
            <strong>Date:</strong> {date}
          </li>
          <li>
            <strong>Time:</strong> {time}
          </li>
          <li>
            <strong>Guests:</strong> {guests}
          </li>
          <li>
            <strong>Name:</strong> {name}
          </li>
          <li>
            <strong>Contact:</strong> {contact}
          </li>
        </ul>
        <p className="mt-4 text-green-600 font-semibold">
          Your booking has been confirmed. We look forward to serving you!
        </p>
      </div>
    );
  }
  