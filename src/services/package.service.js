import { apiAdmin } from "../api/api";

/* Get all packages */
export const getAllPackagesService = (params) =>
  apiAdmin.get("/packages/all", { params });

/* Get package by ID (Admin Edit) */
export const getPackageByIdService = (id) =>
  apiAdmin.get(`/packages/details/${id}`);

/* Create package */
export const createPackageService = (data) =>
  apiAdmin.post("/packages/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
/* Update package */
export const updatePackageService = (id, data) =>
  apiAdmin.put(`/packages/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

/* Update package status */
export const updatePackageStatusService = (id, status) =>
  apiAdmin.patch(`/packages/${id}/status`, { status });

/* Delete package */
export const deletePackageService = (id) =>
  apiAdmin.delete(`/packages/${id}`);