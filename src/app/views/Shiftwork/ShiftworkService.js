import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/shiftwork";

export const pagingShiftwork = (searchPayload) => axios.post(`${API_PATH}/searchByPage`, searchPayload);

export const getOrganizationByUser = () => axios.get(`${API_PATH}/getOrganizationByUser`);

export const getAllShiftworks = () => axios.get(`${API_PATH}`);

export const getShiftworkById = (id) => axios.get(`${API_PATH}/${id}`);

export const createShiftwork = (Shiftwork) => axios.post(`${API_PATH}`, Shiftwork);

export const updateShiftwork = (Shiftwork) => axios.put(`${API_PATH}/${Shiftwork.id}`, Shiftwork);

export const checkCode = (code) => axios.get(`${API_PATH}/checkCode/${code}`);

export const deleteShiftwork = (id) => axios.delete(`${API_PATH}/${id}`);

export const deleteMultiple = (listShiftwork) => axios.delete(`${API_PATH}`, { data: listShiftwork });