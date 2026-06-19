import { apiAdmin } from "../api/api";

export const getAllInquiriesService = () => {
  return apiAdmin.get("/inquiry/all");
};

export const updateInquiryStatusService = (id, status) => {
  return apiAdmin.patch(`/inquiry/${id}/status`, { status });
};