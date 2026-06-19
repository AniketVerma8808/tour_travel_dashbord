import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">

      {/* Sidebar */}
      <div className=" shrink-0">
        <AdminSidebar
          open={open}
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-1 overflow-hidden">

        <AdminHeader
          toggleSidebar={() => setOpen(!open)}
        />

        <main className="flex-1 overflow-y-auto page">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;