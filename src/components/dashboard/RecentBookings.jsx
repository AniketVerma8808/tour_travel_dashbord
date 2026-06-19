const RecentBookings = ({ bookings }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="font-semibold mb-4">Recent Bookings</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>Booking No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings?.map((b) => (
            <tr key={b._id} className="border-b">
              <td className="py-2">{b.bookingNumber}</td>
              <td>{b.name}</td>
              <td>{b.phone}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookings;