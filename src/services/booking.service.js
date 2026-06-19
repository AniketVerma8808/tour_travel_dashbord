import { apiAdmin } from "../api/api";


export const getAllBookingsService = () => {
  return apiAdmin.get("/booking/all");
};

export const updateBookingStatusService = (id, status) => {
  return apiAdmin.patch(`/booking/${id}/status`, { status });
};