import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH_EMR = ConstantList.API_EN_POINT_EMR + "/api/store-request";
const API_PATH = ConstantList.API_ENPOINT + "/api/store-transaction";
const API_PATH_STORE = ConstantList.API_ENPOINT + "/api/store-request";

export const pagingStoreRequest = (searchObject) => axios.post(API_PATH_STORE + "/search-by-page", searchObject);

export const getStoreRequestById = (storeRequestId) => axios.get(API_PATH_STORE + "/get-by-id/" + storeRequestId);

export const deleteStoreRequest = id => axios.delete(API_PATH_STORE + "/delete-by-id/" + id);

export const createStoreRequest = dto => axios.post(API_PATH_STORE + "/create-store-request", dto);

export const updateStoreRequest = (dto, id) => axios.put(API_PATH_STORE + "/update-store-request/" + id, dto);

export const confirmStatusStoreRequest = (storeRequestId, status) => axios.get(`${API_PATH_EMR}/confirm/${storeRequestId}/${status}`);

export const stockOutFromEMR = (storeRequest) => axios.post(`${API_PATH}/stock-out-from-emr`, storeRequest);
