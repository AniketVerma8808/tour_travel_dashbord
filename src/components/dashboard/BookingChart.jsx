import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BookingChart = ({ stats }) => {
  const data = [
    {
      name: "Pending",
      value: stats.pendingBookings || 0,
    },
    {
      name: "Confirmed",
      value: stats.confirmedBookings || 0,
    },
    {
      name: "Completed",
      value: stats.completedBookings || 0,
    },
    {
      name: "Cancelled",
      value: stats.cancelledBookings || 0,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
    "#ef4444",
  ];

  const total =
    (stats.pendingBookings || 0) +
    (stats.confirmedBookings || 0) +
    (stats.completedBookings || 0) +
    (stats.cancelledBookings || 0);

  return (
    <div className="dashboard-card p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-semibold text-[var(--color-heading)]">
            Booking Analytics
          </h2>

          <p className="text-sm text-[var(--color-text-light)] mt-1">
            Booking status overview
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#c9a227] to-[#e8c766] text-white px-4 py-2 rounded-xl shadow">
          <p className="text-xs opacity-90">
            Total
          </p>

          <p className="font-bold text-lg">
            {total}
          </p>
        </div>

      </div>

      {/* Chart */}
      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
          <p className="text-xs text-gray-500">
            Pending
          </p>

          <p className="font-bold text-amber-600 text-lg">
            {stats.pendingBookings || 0}
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
          <p className="text-xs text-gray-500">
            Confirmed
          </p>

          <p className="font-bold text-blue-600 text-lg">
            {stats.confirmedBookings || 0}
          </p>
        </div>

        <div className="bg-green-50 border border-green-100 rounded-xl p-3">
          <p className="text-xs text-gray-500">
            Completed
          </p>

          <p className="font-bold text-green-600 text-lg">
            {stats.completedBookings || 0}
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-xl p-3">
          <p className="text-xs text-gray-500">
            Cancelled
          </p>

          <p className="font-bold text-red-600 text-lg">
            {stats.cancelledBookings || 0}
          </p>
        </div>

      </div>

    </div>
  );
};

export default BookingChart;