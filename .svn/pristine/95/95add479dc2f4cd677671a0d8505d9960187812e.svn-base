import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/delivery_partner";

export const pagingDelPartner = (searchObj) => axios.post(`${API_PATH}/searchByPage`, searchObj);

export const getDelPartnerById = (id) => axios.get(`${API_PATH}/${id}`);

export const saveDelPartner = (delPartner) => axios.post(`${API_PATH}`, delPartner);

export const deleteDelPartner = (id) => axios.delete(`${API_PATH}/delete/${id}`);

export const deleteDelPartnerMulti = (delPartners) => axios.delete(`${API_PATH}`, { data: delPartners })
