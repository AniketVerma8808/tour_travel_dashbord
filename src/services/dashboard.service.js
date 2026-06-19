import { apiAdmin } from "../api/api";

export const getDashboardService = () => {
  return apiAdmin.get("/dashboard");
};