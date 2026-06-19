import { useEffect, useState } from "react";
import { getDashboardService } from "../../services/dashboard.service";
import StatsCards from "../../components/dashboard/StatsCards";
import BookingChart from "../../components/dashboard/BookingChart";
import RecentBookings from "../../components/dashboard/RecentBookings";
import { TailSpin } from "react-loader-spinner";

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
      } else {
        setError("Failed to load dashboard data");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // LOADER
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <TailSpin height={40} width={40} color="#c9a227" />
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="page">
        <div className="status status-danger">{error}</div>
        <button className="btn-primary mt-4" onClick={fetchDashboard}>
          Retry
        </button>
      </div>
    );
  }

  // EMPTY SAFE CHECK
  if (!data) {
    return (
      <div className="page">
        <div className="status status-info">
          No dashboard data available
        </div>
      </div>
    );
  }

  return (
    <div className="page space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Overview of your business performance
        </p>
      </div>

      {/* STATS */}
      <StatsCards stats={data?.stats || {}} />

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="dashboard-card p-5">
          <h2 className="card-title mb-4">Booking Analytics</h2>
          <BookingChart stats={data?.stats || {}} />
        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <div className="dashboard-card p-5">
        <h2 className="card-title mb-4">Recent Bookings</h2>
        <RecentBookings bookings={data?.recentBookings || []} />
      </div>

    </div>
  );
};

export default Dashboard;