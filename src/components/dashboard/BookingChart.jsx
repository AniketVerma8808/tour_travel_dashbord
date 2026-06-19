import { PieChart, Pie, Cell, Tooltip } from "recharts";

const BookingChart = ({ stats }) => {
  const data = [
    { name: "Pending", value: stats.pendingBookings },
    { name: "Confirmed", value: stats.confirmedBookings },
    { name: "Completed", value: stats.completedBookings },
    { name: "Cancelled", value: stats.cancelledBookings },
  ];

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="font-semibold mb-4">Booking Status</h2>

      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default BookingChart;