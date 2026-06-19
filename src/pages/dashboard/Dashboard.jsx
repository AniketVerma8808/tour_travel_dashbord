import { useEffect, useState } from "react";
import { getDashboardService } from "../../services/dashboard.service";

import StatsCards from "../../components/dashboard/StatsCards";
import BookingChart from "../../components/dashboard/BookingChart";
import PackageChart from "../../components/dashboard/PackageChart";

import RecentBookings from "../../components/dashboard/RecentBookings";
import RecentInquiries from "../../components/dashboard/RecentInquiries";
import RecentReviews from "../../components/dashboard/RecentReviews";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getDashboardService();

      if (res.data?.success) {
        setData(res.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (error) {
    return (
      <div className="page">
        <div className="status status-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page space-y-6">

      {/* STATS */}
      <StatsCards
        stats={data?.stats || {}}
        loading={loading}
      />

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="dashboard-card p-5">
          <BookingChart
            stats={data?.stats || {}}
            loading={loading}
          />
        </div>

        <div className="dashboard-card p-5">
          <PackageChart
            stats={data?.stats || {}}
            loading={loading}
          />
        </div>

      </div>

      {/* BOOKINGS + INQUIRIES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="dashboard-card p-5">
          <RecentBookings
            bookings={data?.recentBookings || []}
            loading={loading}
          />
        </div>

        <div className="dashboard-card p-5">
          <RecentInquiries
            inquiries={data?.recentInquiries || []}
            loading={loading}
          />
        </div>

      </div>

      {/* REVIEWS */}
      <div className="dashboard-card p-5">
        <RecentReviews
          reviews={data?.recentReviews || []}
          loading={loading}
        />
      </div>

    </div>
  );
};

export default Dashboard;