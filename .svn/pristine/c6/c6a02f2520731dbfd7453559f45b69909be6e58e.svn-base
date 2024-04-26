import axios from "axios";
import ConstantList from "../../appConfig";
const API_PATH_EMR = ConstantList.API_EN_POINT_EMR + "/api/store-request";
const API_PATH = ConstantList.API_ENPOINT + "/api/store-transaction";

export const pagingStoreRequest = (searchObject) => axios.post(API_PATH_EMR + "/search-by-page", searchObject);

export const getStoreRequestById = (storeRequestId) => axios.get(API_PATH_EMR + "/get-by-id/" + storeRequestId);

export const confirmStatusStoreRequest = (storeRequestId, status) => axios.get(`${API_PATH_EMR}/confirm/${storeRequestId}/${status}`);

export const stockOutFromEMR = (storeRequest) => axios.post(`${API_PATH}/stock-out-from-emr`, storeRequest);