import { apiAdmin } from "../api/api";

export const getAllBannersService = async () => {
  return await apiAdmin.get("/banners");
};

export const createBannerService = async (data) => {
  return await apiAdmin.post("/banners", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteBannerService = async (id) => {
  return await apiAdmin.delete(`/banners/${id}`);
};