import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/bank";

export const pagingBank = (searchPayload) => axios.post(`${API_PATH}/paging`, searchPayload);

export const getBankById = (id) => axios.get(`${API_PATH}/${id}`);

export const saveBank = (Shiftwork) => axios.post(`${API_PATH}`, Shiftwork);

export const deleteBank = (id) => axios.delete(`${API_PATH}/${id}`);

export const checkBank = () => axios.get(`${API_PATH}/checkBank`);
