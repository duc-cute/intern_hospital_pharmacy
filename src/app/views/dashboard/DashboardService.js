import axios from "axios";
import ConstantList from "app/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/dashboard";

export const getTodaySalesResult = () => axios.get(`${API_PATH}/getTodaySalesResult`);

export const getChart1Dashboard = (obj) => axios.post(`${API_PATH}/getChart1`, obj);
export const getChart2Dashboard = (obj) => axios.post(`${API_PATH}/getChart2`, obj);