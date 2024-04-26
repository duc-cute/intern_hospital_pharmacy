import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/delivery_place";

export const pagingDelPlace = (searchPayload) => axios.post(`${API_PATH}/searchByDto`, searchPayload);

export const getDelPlaceById = (id) => axios.get(`${API_PATH}/getById/${id}`);

export const saveDelPlace = (delPlace) => axios.post(API_PATH, delPlace);

export const deleteDelPlace = (id) => axios.delete(`${API_PATH}/${id}`);

export const deleteDelPlaceMulti = (delPlaces) => axios.delete(API_PATH, { data: delPlaces })