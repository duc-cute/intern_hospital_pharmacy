import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/sale-associcate";

export const pagingSaleAss = (searchPayload) => axios.post(`${API_PATH}/search-by-page`, searchPayload);

export const getSaleAssById = (id) => axios.get(`${API_PATH}/${id}`);

export const saveSaleAss = (saleAss) => axios.post(API_PATH, saleAss);

export const deleteSaleAss = (id) => axios.delete(`${API_PATH}/delete/${id}`);

export const deleteSaleAssMulti = (saleAssociates) => axios.delete(API_PATH, { data: saleAssociates }) 