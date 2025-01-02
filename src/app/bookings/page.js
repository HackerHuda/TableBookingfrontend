import BookingForm from '../../components/BookingForm';

export default function BookingsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Make a Reservation</h1>
      <BookingForm />
    </main>
  );
}
