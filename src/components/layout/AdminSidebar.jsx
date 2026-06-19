import {
  FiHome,
  FiPackage,
  FiCalendar,
  FiMessageSquare,
  FiStar,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    name: "Dashboard",
    icon: <FiHome size={20} />,
    path: "/",
  },
  {
    name: "Packages",
    icon: <FiPackage size={20} />,
    path: "/packages",
  },
  {
    name: "Bookings",
    icon: <FiCalendar size={20} />,
    path: "/bookings",
  },
  {
    name: "Inquiries",
    icon: <FiMessageSquare size={20} />,
    path: "/inquiries",
  },
  {
    name: "Reviews",
    icon: <FiStar size={20} />,
    path: "/reviews",
  },
  {
    name: "Settings",
    icon: <FiSettings size={20} />,
    path: "/settings",
  },
];

const AdminSidebar = ({ open }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <aside
      className={`sidebar fixed lg:relative  top-0 left-0 h-screen w-64 transition-all duration-300 z-50
      ${open
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
        }`}
    >
      <div className="flex flex-col h-full">

        {/* Logo */}

        <div className="h-[70px] border-b border-gray-700 flex items-center px-6">

          {/* Logo Image */}

          {/* <img
            src="/logo.png"
            alt="Logo"
            className="w-11 h-11 object-contain"
          /> */}

          <div className="ml-3">

            <h2 className="sidebar-logo">
              Saroj Kashi
            </h2>

            <p className="text-xs text-gray-400">
              Travels Admin
            </p>

          </div>

        </div>

        {/* Menu */}

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menu.map((item) => {
            const isDashboard =
              item.path === "/" &&
              (location.pathname === "/" ||
                location.pathname === "/dashboard");

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `sidebar-link ${isActive || isDashboard
                    ? "active"
                    : ""
                  }`
                }
              >
                <span className="text-xl">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </nav>
        {/* Logout */}

        <div className="pt-5 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="btn-danger w-full flex items-center justify-center gap-3"
          >
            <FiLogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </aside>
  );
};

export default AdminSidebar;