const RecentBookings = ({ bookings = [] }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status status-warning";

      case "confirmed":
        return "status status-info";

      case "completed":
        return "status status-success";

      case "cancelled":
        return "status status-danger";

      default:
        return "status status-info";
    }
  };

  return (
    <div className="dashboard-card p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl font-semibold text-[var(--color-heading)]">
            Recent Bookings
          </h2>

          <p className="text-sm text-[var(--color-text-light)] mt-1">
            Latest customer bookings
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#c9a227] to-[#e8c766] text-white px-4 py-2 rounded-xl shadow">
          <span className="font-semibold">
            {bookings.length}
          </span>
        </div>

      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="py-10 text-center text-[var(--color-text-light)]">
          No recent bookings found
        </div>
      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-[var(--color-border)]">

                <th className="text-left py-3 text-sm font-semibold text-[var(--color-heading)]">
                  Booking No
                </th>

                <th className="text-left py-3 text-sm font-semibold text-[var(--color-heading)]">
                  Customer
                </th>

                <th className="text-left py-3 text-sm font-semibold text-[var(--color-heading)]">
                  Phone
                </th>

                <th className="text-left py-3 text-sm font-semibold text-[var(--color-heading)]">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings?.slice(0,3).map((b) => (
                <tr
                  key={b._id}
                  className="border-b border-[var(--color-border)] hover:bg-gray-50 transition"
                >

                  <td className="py-4 font-semibold text-[var(--color-primary)]">
                    #{b.bookingNumber}
                  </td>

                  <td className="py-4">

                    <div>
                      <p className="font-medium text-[var(--color-heading)]">
                        {b.name}
                      </p>
                    </div>

                  </td>

                  <td className="py-4 text-[var(--color-text)]">
                    {b.phone}
                  </td>

                  <td className="py-4">
                    <span className={getStatusClass(b.status)}>
                      {b.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default RecentBookings;