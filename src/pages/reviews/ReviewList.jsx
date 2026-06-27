import { useEffect, useState } from "react";
import {
  getAllReviewsService,
  updateReviewStatusService,
} from "../../services/review.service";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await getAllReviewsService();
      if (res.data?.success) {
        setReviews(res.data.reviews || []);
      } else {
        setReviews([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateReviewStatusService(id, status);

      setReviews((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
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
      case "approved":
        return "status status-success";
      case "rejected":
        return "status status-danger";
      default:
        return "status status-info";
    }
  };

  return (
    <div className="page">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-title">Reviews</h1>
        <button
          onClick={fetchReviews}
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

      {/* Table Reviews*/}
      <div className="table-card">
        <div className="p-4 border-b border-[var(--color-border)]">
          <h2 className="table-title">All Reviews</h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="table-header">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">City</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {/* Loading */}
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-t border-[var(--color-border)]"
                  >
                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-24"></div>
                    </td>

                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
                    </td>

                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-16"></div>
                    </td>

                    <td className="p-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-40"></div>
                    </td>

                    <td className="p-4">
                      <div className="h-5 bg-gray-200 animate-pulse rounded w-20"></div>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <div className="h-8 bg-gray-200 animate-pulse rounded w-16"></div>
                        <div className="h-8 bg-gray-200 animate-pulse rounded w-20"></div>
                        <div className="h-8 bg-gray-200 animate-pulse rounded w-20"></div>
                      </div>
                    </td>
                  </tr>
                ))

              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center">
                    No reviews found
                  </td>
                </tr>
              ) : (
                reviews?.map((item) => (
                  <tr key={item._id} className="border-t border-[var(--color-border)]">

                    <td className="p-4 font-medium">{item.name}</td>

                    <td className="p-4">{item.city}</td>

                    <td className="p-4">
                      ⭐ {item.rating}/5
                    </td>

                    <td className="p-4 max-w-[250px] truncate">
                      {item.review}
                    </td>

                    <td className="p-4">
                      <span className={getStatusClass(item.status)}>
                        {item.status}
                      </span>
                    </td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() => setSelectedReview(item)}
                        className="btn-outline text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(item._id, "approved")
                        }
                        className="btn-primary text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(item._id, "rejected")
                        }
                        className="btn-danger text-sm"
                      >
                        Reject
                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>
      {selectedReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md rounded-[18px] shadow-lg p-6 relative">

            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black"
            >
              ×
            </button>

            <h2 className="text-[20px] font-semibold text-[var(--color-heading)] mb-2">
              {selectedReview.name} ({selectedReview.city})
            </h2>

            <p className="text-sm text-[var(--color-text)] mb-3">
              ⭐ Rating: {selectedReview.rating}/5
            </p>

            <p className="text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">
              {selectedReview.review}
            </p>

          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewList;