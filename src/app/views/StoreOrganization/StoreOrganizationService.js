import axios from "axios";
import ConstantList from "app/appConfig";
const API_PATH = ConstantList.API_ENPOINT + "/api/storeOrganization/";

export const saveOrUpdateStoreOrganization = dto => axios.post(API_PATH, dto)

export const getStoreOrganizationById = id => axios.get(API_PATH + id)

export const deleteOrganizationById = id => axios.delete(API_PATH + id)

export const pagingStoreOrganization = dto => axios.post(API_PATH + "searchByPage", dto)

export const checkCodeStoreOrganization = dto => axios.post(API_PATH + "checkCode", dto)