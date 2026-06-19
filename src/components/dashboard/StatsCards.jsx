const StatsCards = ({ stats }) => {
  const items = [
    { label: "Total Bookings", value: stats.totalBookings },
    { label: "Pending", value: stats.pendingBookings },
    { label: "Confirmed", value: stats.confirmedBookings },
    { label: "Completed", value: stats.completedBookings },
    { label: "Packages", value: stats.totalPackages },
    { label: "Active Packages", value: stats.activePackages },
    { label: "Inquiries", value: stats.totalInquiries },
    { label: "Reviews", value: stats.totalReviews },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">{item.label}</p>
          <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;