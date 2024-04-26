import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/shiftWorkChange";

export const pagingShiftWorkChange = (searchPayload) => axios.post(`${API_PATH}/paging`, searchPayload);

export const getShiftWorkChangeById = (id) => axios.get(`${API_PATH}/${id}`);

export const saveShiftWorkChange = (Shiftwork) => axios.post(`${API_PATH}`, Shiftwork);

export const deleteShiftWorkChange = (id) => axios.delete(`${API_PATH}/${id}`);

export const checkShiftWorkChange = () => axios.get(`${API_PATH}/checkShiftWorkChange`);

export const closeShiftWork = (obj) => axios.post(`${API_PATH}/closeShiftWork`, obj);

export const getShiftWorkChangeOpen = () => axios.get(`${API_PATH}/getShiftWorkChangeOpen`);

export const getInfoSaleOrderByShiftWorkChange = id => axios.get(`${API_PATH}/getInfoSaleOrderByShiftWorkChange/${id}`);