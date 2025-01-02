import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Restaurant Booking System</h1>
      <p className="text-lg text-gray-600 mb-6">Book your table with ease.</p>
      <a
        href="/bookings"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Make a Reservation
      </a>
    </main>
  );
}
