import { apiAdmin } from "../api/api";

export const getAllReviewsService = () => {
  return apiAdmin.get("/review/all");
};

export const updateReviewStatusService = (id, status) => {
  return apiAdmin.patch(`/review/${id}/status`, { status });
};