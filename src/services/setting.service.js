import { apiAdmin } from "../api/api";

export const getSettingsService = () => {
  return apiAdmin.get("/settings");
};

export const updateSettingsService = (data) => {
  return apiAdmin.put("/settings", data);
};