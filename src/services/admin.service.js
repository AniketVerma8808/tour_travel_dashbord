import apiClient from "../api/api";

export const loginService = (data) => {
    return apiClient.post("/admin/login", data);
};