import {
  FiMenu,
  FiBell,
  FiUser,
  FiSearch,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const AdminHeader = ({ toggleSidebar }) => {
  const { admin } = useAuth();

  return (
    <header className="dashboard-header h-[70px] flex items-center justify-between px-8 bg-white border-b border-gray-200">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={toggleSidebar}
          className="lg:hidden text-2xl text-gray-600"
        >
          <FiMenu />
        </button>

        <div>
          <h1 className="header-title">
            Dashboard
          </h1>

          <p className="page-subtitle">
            Welcome back, Admin 👋
          </p>
        </div>

      </div>


      <div className="flex items-center gap-4">
        {/* <div className="hidden lg:flex items-center relative w-80">

          <FiSearch className="absolute left-4 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search..."
            className="form-control pl-11"
          />

        </div> */}

        <button className="relative flex items-center justify-center h-11 w-11 rounded-xl border border-gray-200 hover:bg-gray-100 transition">

          <FiBell className="text-xl text-gray-700" />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        <button className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-100 transition">

          <div className="card-icon icon-gold w-11 h-11">

            <FiUser size={18} />

          </div>

          <div className="hidden md:block text-left">
            <h4 className="header-user">
              {admin?.name || "Admin"}
            </h4>

            <p className="header-role">
              Administrator
            </p>
          </div>
          
          <FiChevronDown className="hidden md:block text-gray-500" />

        </button>

      </div>

    </header>
  );
};

export default AdminHeader;