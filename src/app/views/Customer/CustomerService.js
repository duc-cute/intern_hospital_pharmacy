import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/customer";

export const pagingCustomer = (searchObject) => axios.post(`${API_PATH}/searchByPage`, searchObject)

export const getAllCustomer = () => axios.get(API_PATH);

export const getCustomerById = (id) => axios.get(`${API_PATH}/${id}`);

export const saveCustomer = (customer) => axios.post(API_PATH, customer);

export const deleteCustomer = (id) => axios.delete(`${API_PATH}/${id}`)