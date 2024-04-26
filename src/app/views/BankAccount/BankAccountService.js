import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/bankAccount";

export const pagingBankAccount = (searchPayload) => axios.post(`${API_PATH}/paging`, searchPayload);

export const getBankAccountById = (id) => axios.get(`${API_PATH}/${id}`);

export const saveBankAccount = (Shiftwork) => axios.post(`${API_PATH}`, Shiftwork);

export const deleteBankAccount = (id) => axios.delete(`${API_PATH}/${id}`);

export const checkBankAccount = () => axios.get(`${API_PATH}/checkBankAccount`);