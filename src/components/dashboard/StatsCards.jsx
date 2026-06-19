import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiPackage,
  FiBox,
  FiMessageSquare,
  FiStar,
} from "react-icons/fi";

const StatsCards = ({ stats }) => {
  const items = [
    {
      label: "Total Bookings",
      value: stats.totalBookings || 0,
      icon: <FiCalendar size={24} />,
      iconClass: "icon-gold",
    },
    {
      label: "Pending",
      value: stats.pendingBookings || 0,
      icon: <FiClock size={24} />,
      iconClass: "icon-orange",
    },
    {
      label: "Confirmed",
      value: stats.confirmedBookings || 0,
      icon: <FiTrendingUp size={24} />,
      iconClass: "icon-blue",
    },
    {
      label: "Completed",
      value: stats.completedBookings || 0,
      icon: <FiCheckCircle size={24} />,
      iconClass: "icon-green",
    },
    {
      label: "Packages",
      value: stats.totalPackages || 0,
      icon: <FiPackage size={24} />,
      iconClass: "icon-gold",
    },
    {
      label: "Active Packages",
      value: stats.activePackages || 0,
      icon: <FiBox size={24} />,
      iconClass: "icon-green",
    },
    {
      label: "Inquiries",
      value: stats.totalInquiries || 0,
      icon: <FiMessageSquare size={24} />,
      iconClass: "icon-blue",
    },
    {
      label: "Reviews",
      value: stats.totalReviews || 0,
      icon: <FiStar size={24} />,
      iconClass: "icon-orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {items.map((item, i) => (
        <div
          key={i}
          className="
            dashboard-card
            p-5
            flex
            items-center
            justify-between
            hover-up
          "
        >
          <div>
            <p className="card-title">
              {item.label}
            </p>

            <h2 className="card-value">
              {item.value}
            </h2>
          </div>

          <div className={`card-icon ${item.iconClass}`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;