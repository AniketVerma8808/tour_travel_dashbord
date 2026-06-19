import { useEffect, useState } from "react";
import {
  getAllBookingsService,
  updateBookingStatusService,
} from "../../services/booking.service";
import { TailSpin } from "react-loader-spinner";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await getAllBookingsService();

      if (res.data?.success) {
        setBookings(res.data.bookings || []);
      } else {
        setBookings([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      await updateBookingStatusService(id, status);

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status } : b
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status status-info";
      case "confirmed":
        return "status status-warning";
      case "completed":
        return "status status-success";
      case "cancelled":
        return "status status-danger";
      default:
        return "status status-info";
    }
  };

  // ✅ IMPORTANT: business rules
  const canConfirm = (status) => status === "pending";
  const canCancel = (status) => status === "pending" || status === "confirmed";
  const canComplete = (status) => status === "confirmed";

  return (
    <div className="page">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-subtitle">Manage all customer bookings</p>
        </div>

        <button onClick={fetchBookings} className="btn-primary">
          Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="status status-danger mb-4">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="table-card">

        <div className="p-4 border-b border-[var(--color-border)]">
          <h2 className="table-title">All Bookings</h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="table-header">
              <tr>
                <th className="p-4">Booking No</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Route</th>
                <th className="p-4">Package</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {/* LOADING */}
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-10 text-center">
                    <div className="flex justify-center">
                      <TailSpin height={40} width={40} color="#c9a227" />
                    </div>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-6 text-center">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((item) => (
                  <tr key={item._id} className="border-t">

                    <td className="p-4 font-medium">
                      {item.bookingNumber}
                    </td>

                    <td className="p-4">{item.name}</td>

                    <td className="p-4">{item.phone}</td>

                    <td className="p-4 text-sm">
                      {item.pickup} → {item.drop}
                    </td>

                    <td className="p-4">
                      {item.packageSnapshot?.title || "Custom"}
                    </td>

                    <td className="p-4">
                      {new Date(item.travelDate).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <span className={getStatusClass(item.status)}>
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4 flex gap-2 flex-wrap">

                      <button
                        onClick={() => setSelectedBooking(item)}
                        className="btn-outline text-sm"
                      >
                        View
                      </button>

                      {/* CONFIRM */}
                      {canConfirm(item.status) && (
                        <button
                          disabled={updatingId === item._id}
                          onClick={() =>
                            handleStatusChange(item._id, "confirmed")
                          }
                          className="btn-primary text-sm"
                        >
                          Confirm
                        </button>
                      )}

                      {/* COMPLETE */}
                      {canComplete(item.status) && (
                        <button
                          disabled={updatingId === item._id}
                          onClick={() =>
                            handleStatusChange(item._id, "completed")
                          }
                          className="btn-outline text-sm"
                        >
                          Done
                        </button>
                      )}

                      {/* CANCEL */}
                      {canCancel(item.status) && (
                        <button
                          disabled={updatingId === item._id}
                          onClick={() =>
                            handleStatusChange(item._id, "cancelled")
                          }
                          className="btn-danger text-sm"
                        >
                          Cancel
                        </button>
                      )}

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-lg rounded-[18px] shadow-lg p-6 relative">

            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-4 text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">
              Booking Details
            </h2>

            <div className="space-y-2 text-sm">

              <p><b>Booking No:</b> {selectedBooking.bookingNumber}</p>
              <p><b>Name:</b> {selectedBooking.name}</p>
              <p><b>Phone:</b> {selectedBooking.phone}</p>
              <p><b>Email:</b> {selectedBooking.email || "-"}</p>
              <p><b>Route:</b> {selectedBooking.pickup} → {selectedBooking.drop}</p>
              <p><b>Vehicle:</b> {selectedBooking.vehicle}</p>
              <p><b>Passengers:</b> {selectedBooking.numberOfPassengers || "-"}</p>
              <p><b>Message:</b> {selectedBooking.customerMessage || "-"}</p>

              <hr />

              <p className="font-semibold">Status History</p>

              {selectedBooking.statusHistory?.map((h, i) => (
                <p key={i} className="text-xs text-gray-600">
                  {h.status} → {new Date(h.updatedAt).toLocaleString()}
                </p>
              ))}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default BookingList;