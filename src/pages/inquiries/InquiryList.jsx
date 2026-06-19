import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import { getAllInquiriesService, updateInquiryStatusService } from "../../services/inquiry.service";


const InquiryList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await getAllInquiriesService();

      if (res.data?.success) {
        setInquiries(res.data.inquiries || []);
      } else {
        setInquiries([]);
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to fetch inquiries"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

const handleStatusUpdate = async (item) => {
  try {
    let newStatus;

    if (item.status === "pending") {
      newStatus = "contacted";
    } else if (item.status === "contacted") {
      newStatus = "completed";
    } else if (item.status === "completed") {
      return;
    }

    await updateInquiryStatusService(item._id, newStatus);

    setInquiries((prev) =>
      prev.map((i) =>
        i._id === item._id
          ? { ...i, status: newStatus }
          : i
      )
    );

  } catch (err) {
    console.log(err);
  }
};

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status status-info";
      case "contacted":
        return "status status-warning";
      case "completed":
        return "status status-success";
      case "cancelled":
        return "status status-danger";
      default:
        return "status status-info";
    }
  };

  return (
    <div className="page">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title">Inquiry List</h1>
          <p className="page-subtitle">
            Manage all customer inquiries
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          disabled={loading}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="status status-danger mb-4">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="table-card">
        <div className="p-4 border-b border-[var(--color-border)]">
          <h2 className="table-title">All Inquiries</h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">
            <thead className="table-header">
              <tr>
                <th className="p-4 table-heading">Name</th>
                <th className="p-4 table-heading">Phone</th>
                <th className="p-4 table-heading">Email</th>
                <th className="p-4 table-heading">Message</th>
                <th className="p-4 table-heading">Status</th>
                <th className="p-4 table-heading">Action</th>
                <th className="p-4 table-heading">Contacted</th>
              </tr>
            </thead>

            <tbody>

              {/* LOADING SKELETON */}
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-t border-[var(--color-border)]">
                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-28"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-32"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-40"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-5 bg-gray-200 animate-pulse rounded w-20"></div>
                    </td>
                    <td className="p-4">
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-24"></div>
                    </td>
                  </tr>
                ))
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center">
                    No inquiries found
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr
                    key={item._id}
                    className="table-row border-t border-[var(--color-border)]"
                  >
                    <td className="p-4 font-medium text-[var(--color-heading)]">
                      {item.name}
                    </td>

                    <td className="p-4">{item.phone}</td>

                    <td className="p-4">{item.email || "-"}</td>

                    <td className="p-4 max-w-[250px] truncate">
                      {item.message}
                    </td>

                    <td className="p-4">
                      <span className={getStatusClass(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">

                      {/* VIEW BUTTON */}
                      <button
                        className="btn-outline text-sm"
                        onClick={() => setSelectedInquiry(item)}
                      >
                        View
                      </button>

                    </td>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={item.status === "contacted"}
                        onChange={() => handleStatusUpdate(item)}
                      />
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>

        </div>
      </div>

      {/* MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md rounded-[18px] shadow-lg p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="text-[20px] font-semibold text-[var(--color-heading)] mb-4">
              Inquiry Message
            </h2>

            {/* Message */}
            <p className="text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
              {selectedInquiry?.message}
            </p>

          </div>

        </div>
      )}
    </div>
  );
};

export default InquiryList;