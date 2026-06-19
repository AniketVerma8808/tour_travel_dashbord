import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";
import PackageList from "../pages/packages/PackageList";
import PackageForm from "../pages/packages/PackageForm";
import BookingList from "../pages/bookings/BookingList";
import InquiryList from "../pages/inquiries/InquiryList";
import ReviewList from "../pages/reviews/ReviewList";
import Settings from "../pages/settings/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/packages" element={<PackageList />} />
          <Route path="/packages/create" element={<PackageForm />} />
          <Route path="/packages/edit/:id" element={<PackageForm />} />

          <Route path="/bookings" element={<BookingList />} />
          <Route path="/inquiries" element={<InquiryList />} />
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;